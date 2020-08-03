import React from "react";
import Thread from "./Thread";
import NewThread from "./NewThread";
import ThreadContainer from './ThreadContainer';
export default class Forum extends React.Component {
  render() {
    return (
      <div>
        <h1 className={"app-cont-title"} style={{marginBottom: "-1em"}}> Welcome to the Forum!</h1>
        {/* <NewThread /> */}
        <ThreadContainer />
      </div>
    );
  }
}
