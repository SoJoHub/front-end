import React, { useState, useEffect } from "react";
import Thread from "./Thread";
import NewThread from "./NewThread";

export default function TheadContainer() {
  const [state, setState] = useState([]);
  //newThread states
  const [postForm, setPostForm] = useState(false);
  const [postId, setPostId] = useState("");

  const [formState, setformState] = useState({
    topic: "",
    description: "",
  });

  useEffect(() => {
    fetch("https://sojohubbackend.herokuapp.com/topics")
      .then((r) => r.json())
      .then((topicsObj) => {
        setState(topicsObj);
      });
  }, []);

  const showEditForm = (obj) => {
    setPostId(obj.id);
    setPostForm(true);
    setformState({
      topic: obj.title,
      description: obj.description,
    });
  };

  const renderThread = () => {
    // console.log(state)
    return state.map((thread) => (
      <Thread
        threadInfo={thread}
        key={thread.id}
        threadStateHandler={setState}
        showForm={showEditForm}
        deletePost={setState}
      />
    ));
  };
  return (
    <div>
      <NewThread
        postForm={postForm}
        renderNewPost={setState}
        postId={postId}
        formState={formState}
        setPostForm={setPostForm}
        setIsNew={setPostId}
        setformState={setformState}
      />
      {state.length > 0 && renderThread()}
    </div>
  );
}
