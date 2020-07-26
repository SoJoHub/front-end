import React, { useState, useEffect } from "react";
import Thread from "./Thread";

export default function TheadContainer() {
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/topics")
      .then((r) => r.json())
      .then((topicsObj) => {
        setState(topicsObj);
      });
  }, []);

  const renderThread = () => {
    return state.map((thread) => (
      <Thread threadInfo={thread} key={thread.id} />
    ));
  };
  return <div>{state.length > 0 && renderThread()}</div>;
}
