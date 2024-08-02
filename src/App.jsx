


// change bg- green
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const App = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [saveAllDetail, setSaveAllDetail] = useState([]);
  const [currentInterval, setCurrentInterval] = useState("");

  // Function to generate a unique color based on the index
  const generateColor = (index) => {
    const colors = [
      "#FFDDC1", "#FFABAB", "#FFC3A0", "#E2B8A1", "#D6E4E5", "#B4CDED",
      "#C4E1E0", "#C1C8E4", "#D6A3A5", "#F5C6C6", "#F2C6B0", "#D9E3F0"
    ];
    return colors[index % colors.length];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUserAdd = {
      task: task,
      date: date,
      time: time,
    };

    const addData = [...saveAllDetail, newUserAdd];
    setSaveAllDetail(addData);
    localStorage.setItem("task03", JSON.stringify(addData));
  };

  useEffect(() => {
    const getInformetion = JSON.parse(localStorage.getItem("task03")) || [];
    setSaveAllDetail(getInformetion);

    // Update the current interval every 30 minutes
    const updateInterval = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const intervalStart = `${now.getHours()}:${Math.floor(minutes / 30) * 30}`;
      setCurrentInterval(intervalStart);
    };

    // Initial update
    updateInterval();

    // Set an interval to update the current interval every 30 minutes
    const intervalId = setInterval(updateInterval, 30 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [currentInterval]);

  // Check if a task's time is within the current 30-minute interval
  const isCurrentInterval = (taskTime) => {
    const [taskHour, taskMinute] = taskTime.split(':').map(Number);
    const [currentHour, currentMinute] = currentInterval.split(':').map(Number);
    
    const taskMinutes = taskHour * 60 + taskMinute;
    const currentMinutes = currentHour * 60 + currentMinute;

    return taskMinutes >= currentMinutes && taskMinutes < currentMinutes + 30;
  };

  return (
    <>
      <div className="p-5">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Task Detail</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task Detail"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </div>

      <div className="p-5">
        {saveAllDetail.map((item, index) => (
          <div
            key={index}
            style={{ 
              backgroundColor: isCurrentInterval(item.time) ? "green" : generateColor(index),
              color: "#fff" 
            }}
            className="flex justify-between px-4 py-2 my-2 rounded"
          >
            <div className="capitalize">{item.task}</div>
            <div>{item.time}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;


