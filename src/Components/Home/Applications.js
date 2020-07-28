import React from "react";
import { useState, useEffect } from "react";
import Interviews from "./Interviews";
const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    let user = window.localStorage.getItem("sojohub");
    const token = JSON.parse(user).userToken;
    const payLoad = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    fetch("http://localhost:3000/applications", payLoad)
      .then((r) => r.json())
      .then((applicationsObj) => {
        setApplications(applicationsObj);
      });
  }, []);
  console.log(applications);
  const getInterviews = () => {
    return applications.filter((interview) => {
      if (interview.interviews.length > 0) {
        return interview.interviews;
      } else {
        return false;
      }
    });
  };
  return (
    <div>
      <h1>My Interviews</h1>
      <Interviews interviews={getInterviews()} />
    </div>
  );
};

export default Applications;
