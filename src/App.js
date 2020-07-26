import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./Components/Nav/Navbar";
import ApplicationsContainer from "./containers/ApplicationsContainer";
import SignUp from "./Components/Signup/SignUp";
import Signin from "./Components/Signin/Signin";
import { Route, Switch } from "react-router-dom";
import ThreadContainer from "./containers/Forum/ThreadContainer";
import ThreadDetail from "./containers/Forum/ThreadDetail";
class App extends React.Component {
  state = {
    loggedIn: window.localStorage.getItem("sojohub"),
  };

  setLoginState = (userInfo) => {
    this.setState((prevState) => ({
      loggedIn: userInfo,
    }));
  };

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <Navbar
            loggedIn={this.state.loggedIn}
            setLoginState={this.setLoginState}
          />
          <Switch>
            <Route exact path="/Forum" component={ThreadContainer} />
            <Route
              exact
              path="/Forum/Topic/:id"
              render={(props) => <ThreadDetail {...props} />}
            />
            {this.state.loggedIn !== "null" || !this.state.loggedIn ? (
              <Route
                exact
                path="/Applications"
                component={ApplicationsContainer}
              />
            ) : (
              <>
                <Route exact path="/signup" component={SignUp} />
                <Route
                  exact
                  path="/login"
                  render={() => <Signin setLoginState={this.setLoginState} />}
                />
              </>
            )}
          </Switch>
        </div>
        ;
      </React.Fragment>
    );
  }
}

export default App;
