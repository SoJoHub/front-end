// src/components/MessagesArea.js

import React from "react";
import NewMessageForm from "./NewMessageForm";

const MessagesArea = ({ topic: { id, title, comments } }) => {
  return (
    <div className="messagesArea">
      <h2>{title}</h2>
      <ul>{orderedMessages(comments)}</ul>
      <NewMessageForm topic_id={id} />
    </div>
  );
};

export default MessagesArea;

// helpers

const orderedMessages = (comments) => {
  const sortedComments = comments.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedComments.map((comment) => {
    return <li key={comment.id}>{comment.text}</li>;
  });
};
