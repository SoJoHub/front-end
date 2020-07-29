// src/components/Cables.js

import React, { Fragment } from "react";
import { ActionCable } from "react-actioncable-provider";

const Cable = ({ topics, handleReceivedComment }) => {
  return (
    <Fragment>
      {topics.map((topic) => {
        return (
          <ActionCable
            key={topic.id}
            channel={{
              channel: "MessagesChannel",
              topic: topic.id,
            }}
            onReceived={handleReceivedComment}
          />
        );
      })}
    </Fragment>
  );
};

export default Cable;
