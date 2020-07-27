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
import ThreadDetail from "./ThreadDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "150ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function Thread(props) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/forum/topic/${props.threadInfo.id}`);
  };
  const classes = useStyles();
  console.log(props.threadInfo);
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
        </ListItem>
      </List>
    </Container>
  );
}
