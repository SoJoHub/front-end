import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  right: {
    marginLeft: "auto",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const history = useHistory();

  const user_name = JSON.parse(window.localStorage.getItem('sojohub')) ? JSON.parse(window.localStorage.getItem('sojohub')).name : null  

  
  
  const handleLogout = () => {
    window.localStorage.setItem("sojohub", null);
    // return <Redirect to="/login" />;
    history.push("/login");
    props.setLoginState("null");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={Link} to={user_name ? "/" : "/login"}
          >
            <Hidden mdUp>
              <MenuIcon />
            </Hidden>
            SoJoHub
          </IconButton>

          <Hidden smDown>
            <Button color="inherit" component={Link} to="/forum">
              Forum
            </Button>
            {/* CONDITIONALS FOR NAV BAR DISPLAY */}
            {props.loggedIn !== "null" || !props.loggedIn ? (
              <>
                <Button color="inherit" component={Link} to="/applications">
                  My Applications
                </Button>
                <Button color="inherit" component={Link} to="#">
                  My Interviews
                </Button>
                <Button color="inherit" onClick={handleLogout} to="/logout">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  className={classes.right}
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </>
            )}
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
