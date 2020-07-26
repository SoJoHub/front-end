import React, { useEffect, useState } from "react";
import Comment from "./Comment";
export default function ThreadDetail(props) {
  const [state, setState] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3000/topics/${props.match.params.id}`)
      .then((r) => r.json())
      .then((commentObj) => {
        setState(commentObj);
      });
  }, []);

  console.log(state);
  const renderComment = () => {
    return state.comments.map((comment) => (
      <Comment comment={comment} key={comment.id} />
    ));
  };
  return (
    <div>
      <h1>{state.topic && state.topic.title}</h1>
      {state.comments && renderComment()}
    </div>
  );
}
//conditional above > to think, what happens if no comment?
