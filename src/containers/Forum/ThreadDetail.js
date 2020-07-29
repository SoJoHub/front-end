import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import NewComment from "./NewComment";


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
    return state.topic.comments.map((comment) => (
      <Comment comment={comment} key={comment.id} />
    ));
  };
  return (
    <div>
      <h1>{state.topic && state.topic.title}</h1>
      <NewComment topic_id={props.match.params.id} commentState={setState}/>
      {state.topic && renderComment()}
    </div>
  );
}
//conditional above > to think, what happens if no comment?
