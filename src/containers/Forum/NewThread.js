import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PostAddIcon from '@material-ui/icons/PostAdd'



const useStyles = makeStyles((theme) => ({
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
}));

export default function NewThread(props) {
  const classes = useStyles();

  const [postForm, setPostForm] = useState(false); 
  const [state, setState] = useState({
    topic: ""
  });


  const displayFormHanlder = () => {
      setPostForm(prevState => {
          return !prevState
      })
  }

  const changeHandler = (e) => {
    e.persist();
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePostCreation = (e) => {
    e.preventDefault();
    let user = window.localStorage.getItem("sojohub");
    const token = JSON.parse(user).userToken;
    const payLoad = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
        Accept: "application/json",
      },
      body: JSON.stringify(state),
    };
    fetch("http://localhost:3000/topics", payLoad)
      .then((r) => r.json())
      .then((newPost) => {
        console.log(newPost)
      });
  };

  return (
    <> 
    {postForm ? (
    <Container component="main" maxWidth="lg">
        <Button onClick={displayFormHanlder} variant="contained" color="primary">
                Hide Post Form
        </Button>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
          <PostAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create A New Post
        </Typography>
        <form onSubmit={handlePostCreation} className={classes.form} noValidate>
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
            value={state.topic}
          />
          
    
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Post
          </Button>
        </form>
      </div>
    </Container>
    ) : (
        <Button onClick={displayFormHanlder} variant="contained" color="primary">
            Create Post
        </Button>
    )}
 </>
  );
}
