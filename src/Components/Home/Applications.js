import React from "react";
import { useState, useEffect } from "react";
import Interviews from "./Interviews";
const Applications = (props) => {
  const renderApplication = () => {
    props.applications.map((app) => {
      return <Application application={app} />;
    });
  };
  return (
    <div>
      <h1>My Interviews</h1>
    </div>
  );
};

export default Applications;
