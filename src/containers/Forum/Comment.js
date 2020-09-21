import React from "react";
import ReactDOM from "react-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "150ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  button: {
    margin: "20px",
    // padding: "5px"
    marginTop: "30px"
  },
}));

// import "./styles.css";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function Comment(props) {
  const classes = useStyles();

  const user = window.localStorage.getItem("sojohub");
  const user_id = user && user !== "null" ? JSON.parse(user).user_id : null;

  const editComment = () => {
    props.showNewCommentForm(props.comment);
  };
  const deleteComment = () => {
    let user = window.localStorage.getItem("sojohub");
    const token = JSON.parse(user).userToken;
    const payLoad = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    };

    fetch(`https://sojohubbackend.herokuapp.com/comments/${props.comment.id}`, payLoad)
      .then((r) => r.json())
      .then((deletedComment) => {
        props.commentSetState((prevState) => {
          const updatedComments = prevState.topic.comments.filter(
            (com) => com.id !== props.comment.id
          );
          console.log(updatedComments);
          return { topic: { ...prevState.topic, comments: updatedComments } };
        });
      });
  };

  return (
    <div style={{ padding: 14 }} className="App">
      {/* <h1>Comments</h1> */}
      <Paper style={{ padding: "0px 20px", margin: "-25px 20px", borderRadius: "8px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>
              {props.comment.user_name}
            </h4>
            <p style={{ textAlign: "left" }}>{props.comment.content}</p>
            <p style={{ textAlign: "left", color: "gray" }}>
              {props.comment.created_at}
            </p>
          </Grid>
          {props.comment.user_id == user_id && (
            <>
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<EditIcon />}
                onClick={editComment}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={deleteComment}
              >
                Delete
              </Button>
            </>
          )}
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </Paper>
    </div>
  );
}
