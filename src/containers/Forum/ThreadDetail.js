import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import NewComment from "./NewComment";

export default function ThreadDetail(props) {
  const [state, setState] = useState({});

  const [postForm, setPostForm] = useState(false);
  const [comment, setComment] = useState({});
  console.log("post form state", postForm);
  console.log("comm", comment);
  useEffect(() => {
    fetch(`https://sojohubbackend.herokuapp.com/topics/${props.match.params.id}`)
      .then((r) => r.json())
      .then((commentObj) => {
        setState(commentObj);
      });
  }, []);
  const showNewCommentForm = (comment) => {
    setComment(comment);
    setPostForm(true);
  };
  console.log(state);
  const renderComment = () => {
    return state.topic.comments.map((comment) => (
      <Comment
        comment={comment}
        key={comment.id}
        commentSetState={setState}
        showNewCommentForm={showNewCommentForm}
        style={{borderRadius: "10px"}}
      />
    ));
  };
  return (
    <div>
      <h1 className={"app-cont-title"}><b>Topic:</b> {state.topic && state.topic.title}</h1>
      <p className={"app-cont-title"} style={{marginTop: "-4em"}}>{state.topic && state.topic.description}</p>
      <NewComment
        topic_id={props.match.params.id}
        commentState={setState}
        setComment={setComment}
        postForm={postForm}
        setPostForm={setPostForm}
        comment={comment}
      />
      {state.topic && renderComment()}
    </div>
  );
}
//conditional above > to think, what happens if no comment?
