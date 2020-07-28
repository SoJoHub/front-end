import React from "react";
import Interview from "./Interview";
const Interviews = (props) => {
  console.log(props.interviews);
  const renderInterview = () => {
    return props.interviews.map((interview) => {
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

  return <div>{renderInterview()}</div>;
};

export default Interviews;
