import React from "react";
import Interview from "./Interview";
import { Paper } from "@material-ui/core";
import List from "@material-ui/core/List";

const Interviews = (props) => {
  const renderInterview = () => {
    return props.interviews.slice(0, 3).map((interview) => {
      return interview.interviews.map((int) => {
        return (
          <Interview
            key={int.id}
            interview={int}
            company={interview.job_listing.company}
          />
        );
      });
    });
  };

  return (
    <div style={{ height: 424 }}>
      {props.interviews.length > 0 ? (
        // <Paper style={{ height: 375, overflow: "auto" }}>
          <List>{renderInterview()}</List>
        /* </Paper> */
      ) : (
        <div>
          <Interview key="1" interview="Upcoming" company="Dream Company" />
          <Interview key="2" interview="Upcoming" company="Dream Company" />
          <Interview key="3" interview="Upcoming" company="Dream Company" />
        </div>
      )}
    </div>
  );
};
export default Interviews;
