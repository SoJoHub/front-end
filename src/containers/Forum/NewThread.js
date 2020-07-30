import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PostAddIcon from "@material-ui/icons/PostAdd";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  warning: {
    color: "red",
  },
}));

export default function NewThread(props) {
  const classes = useStyles();

  const user = window.localStorage.getItem("sojohub");
  const token = user && user !== "null" ? JSON.parse(user).userToken : null;

  const displayFormHanlder = () => {
    props.setPostForm((prevState) => {
      return !prevState;
    });
  };

  const changeHandler = (e) => {
    e.persist();
    props.setformState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(props.formState);
  };

  const handlePostCreation = (e) => {
    e.preventDefault();
    let user = window.localStorage.getItem("sojohub");
    const token = JSON.parse(user).userToken;

    fetch("http://localhost:3000/topics", {
      method: "POST",
      headers: token,
      body: JSON.stringify(props.formState),
    });
    // this.setState({ title: "" });
    // console.log(props.formState);
  };

  // let user = window.localStorage.getItem("sojohub");
  // const token = JSON.parse(user).userToken;
  // const payLoad = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: token,
  //     Accept: "application/json",
  //   },
  //   body: JSON.stringify(props.formState),
  // };
  // console.log(props.formState);
  // fetch("http://localhost:3000/topics", payLoad)
  //   .then((r) => r.json())
  //   .then((newPost) => {
  //     console.log(newPost);
  //     props.renderNewPost((prevState) => [newPost, ...prevState]);
  //   });
  // props.setformState({ topic: "", description: "" });
  // props.setPostForm(false);

  const handlePostEdit = (e) => {
    e.preventDefault();
    // let user = window.localStorage.getItem("sojohub");
    // const token = JSON.parse(user).userToken;
    const payLoad = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      body: JSON.stringify(props.formState),
    };
    fetch(`http://localhost:3000/topics/${props.postId}`, payLoad)
      .then((r) => r.json())
      .then((updatedPost) => {
        console.log(updatedPost);
        props.renderNewPost((prevState) => {
          const newValue = prevState.filter((item) => item.id !== props.postId);
          return [updatedPost, ...newValue];
        });
      });
    props.setformState({ topic: "", description: "" });
    props.setPostForm(false);
    props.setIsNew("");
  };

  // const showEditForm = () => {
  //   props.setIsNew(false)
  //   props.setPostForm(true)
  // }

  return (
    <>
      {props.postForm ? (
        <Container component="main" maxWidth="lg">
          <Button
            onClick={displayFormHanlder}
            variant="contained"
            color="primary"
          >
            Hide Post Form
          </Button>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              {/* <LockOutlinedIcon /> */}
              <PostAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {props.postId ? "Edit Post" : "Create A New Post"}
            </Typography>
            <Typography component="h1" className={classes.warning}>
              {!token && "Only logged in users can create posts!"}
            </Typography>
            <form
              onSubmit={props.postId ? handlePostEdit : handlePostCreation}
              className={classes.form}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="topic"
                label="topic"
                name="topic"
                autoComplete="topic"
                autoFocus
                onChange={changeHandler}
                value={props.formState.topic}
              />
              <div>
                <TextField
                  className={classes.root}
                  variant="outlined"
                  margin="normal"
                  required
                  rowsMax="10"
                  fullWidth
                  multiline={true}
                  rows="4"
                  id="description"
                  label="description"
                  name="description"
                  autoComplete="description"
                  autoFocus
                  onChange={changeHandler}
                  value={props.formState.description}
                />
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!token}
              >
                {props.postId ? "Edit Post" : "Create Post"}
              </Button>
            </form>
          </div>
        </Container>
      ) : (
        <Button
          onClick={displayFormHanlder}
          variant="contained"
          color="primary"
        >
          {props.postId ? "Edit Post" : "Create Post"}
        </Button>
      )}
    </>
  );
}
