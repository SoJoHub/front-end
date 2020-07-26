import React from "react";
import Comment from "./Comment";
import Thread from "./Thread";
export default class Forum extends React.Component {
  render() {
    return (
      <div>
        <h1> Welcome to the Forum!</h1>
        <Thread />
        {/* <Comment />
        <Comment />
        <Comment /> */}
      </div>
    );
  }
}
