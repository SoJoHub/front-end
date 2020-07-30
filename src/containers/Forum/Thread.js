import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
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
    margin: "1px",
  }
}));

export default function Thread(props) {
  const history = useHistory();

  const user_id = JSON.parse(window.localStorage.getItem('sojohub')) ? JSON.parse(window.localStorage.getItem('sojohub')).user_id : null

  const handleClick = () => {
    history.push(`/forum/topic/${props.threadInfo.id}`);
  };

  const deleteThread = () => {
    let user = window.localStorage.getItem("sojohub");
    const token = JSON.parse(user).userToken;
    const payLoad = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
        Accept: "application/json",
      }
    };
    fetch(`http://localhost:3000/topics/${props.threadInfo.id}`, payLoad)
      .then((r) => r.json())
      .then((deletedThread) => {
        console.log(deletedThread)
        props.deletePost(prevState => {
          const newState = prevState.filter(item => item.id !== deletedThread.id)
          return newState
        })
      });
  }

  const editThread = () => {
    props.showForm(props.threadInfo)

  }

  const classes = useStyles();
  //console.log(props.threadInfo);
  //console.log(JSON.parse(window.localStorage.getItem('sojohub')).user_id)
  return (
    <Container maxWidth="md">
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            {/* Cristian */}
            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
          </ListItemAvatar>
          <ListItemText
            primary={props.threadInfo.title}
            onClick={handleClick}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                {props.threadInfo.user_name} <span> - </span>
                </Typography>
                   {props.threadInfo.description}
              </React.Fragment>
            }
          />
          {props.threadInfo.user_id == user_id &&
          <> 
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<EditIcon />}
            onClick={editThread}
            >
            Edit
          </Button>
          <br></br>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={deleteThread}
            >
            Delete
          </Button>
          </>
          }
        </ListItem>
      </List>
    </Container>
  );
}
