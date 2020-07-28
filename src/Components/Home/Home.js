import React from "react";
import Interviews from "./Interviews";
import ApplicationsList from "../ApplicationsList";
import { useState, useEffect } from "react";
import Stats from "./Stats";

const Home = () => {
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

  const getApplications = () => {
    return applications.map((job) => {
      return job.job_listing;
    });
  };

  const getStats = () => {
    const jobsApplied = applications.length;
    const interviews = applications.reduce((a, b) => {
      console.log(b.interviews.length > 0);
      if (b.interviews.length > 0) {
        return (a = a + 1);
      } else {
        return a;
      }
    }, 0);
    // return jobsApplied;
    return interviews;
  };
  console.log(getStats());
  return (
    <div>
      {<Interviews interviews={getInterviews()} />}
      {<ApplicationsList applications={applications} />}
      {<Stats />}
    </div>
  );
};

export default Home;
