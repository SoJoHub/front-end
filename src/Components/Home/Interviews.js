import React from "react";
import Interview from "./Interview";
const Interviews = (props) => {
  // const a = props.interviews;
  // debugger;
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
    <div>
      {props.interviews.length > 0 ? (
        renderInterview()
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
