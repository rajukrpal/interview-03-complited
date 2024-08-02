
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Testing = () => {
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
  }, []);

  // Helper function to calculate the difference in minutes between two times
  const timeDifferenceInMinutes = (time1, time2) => {
    const [hour1, minute1] = time1.split(':').map(Number);
    const [hour2, minute2] = time2.split(':').map(Number);

    return (hour2 - hour1) * 60 + (minute2 - minute1);
  };

  // Determine the color based on the time difference
  const getTaskColor = (taskTime) => {
    const [currentHour, currentMinute] = currentInterval.split(':').map(Number);
    const currentTime = `${currentHour}:${currentMinute}`;
    
    const diff = timeDifferenceInMinutes(taskTime, currentTime);

    if (diff >= 0 && diff < 30) {
      return "green"; // Current 30-minute interval
    } else if (diff >= 30 && diff < 60) {
      return "gray"; // Within 1 hour
    } else if (diff >= 60 && diff < 120) {
      return "blue"; // Within 2 hours
    } else if (diff >= 120) {
      return "pink"; // More than 2 hours away
    } else {
      return generateColor(saveAllDetail.indexOf(taskTime)); // Fallback color
    }
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
              backgroundColor: getTaskColor(item.time),
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

export default Testing;


// second ------------------

import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Testing = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [saveAllDetail, setSaveAllDetail] = useState([]);

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
  }, []);

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
            style={{ backgroundColor: generateColor(index) }}
            className="flex justify-between px-4 my-2"
          >
            <div className="capitalize">{item.task}</div>
            <div>{item.time}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Testing;


// 3 rd -----

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Testing = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [saveAllDetail, setSaveAllDetail] = useState([]);

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

  useState(() => {
    const getInformetion = JSON.parse(localStorage.getItem("task03")) || [];
    console.log("chack", getInformetion);
    setSaveAllDetail(getInformetion);
  }, []);

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
            className="flex justify-between bg-green-300 px-4 my-2"
          >
            <div className="capitalize">{item.task}</div>
            <div>{item.time}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Testing;

// 4 rth--------


import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Testing = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [saveAllDetail, setSaveAllDetail] = useState([]);

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
  }, []);

  // Function to get the background color based on the current time
  const getBackgroundColor = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    console.log("minutes",minutes)
    return minutes < 10 ? "#FFDDC1" :
           minutes < 20 ? "#FFABAB" :
           minutes < 30 ? "#FFC3A0" :
           minutes < 40 ? "#E2B8A1" :
           minutes < 50 ? "#D6E4E5" :
           "#B4CDED";
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
            style={{ backgroundColor: getBackgroundColor() }}
            className="flex justify-between px-4 my-2"
          >
            <div className="capitalize">{item.task}</div>
            <div>{item.time}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Testing;



