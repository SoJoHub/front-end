import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./Components/Nav/Navbar";
import ApplicationsContainer from "./containers/ApplicationsContainer";
import InterviewsContainer from "./Components/Interviews/InterviewsContainer";
import SignUp from "./Components/Signup/SignUp";
import Signin from "./Components/Signin/Signin";
import { Route, Switch } from "react-router-dom";
import ThreadDetail from "./containers/Forum/ThreadDetail";
import Forum from "./containers/Forum/Forum";
import Home from "./Components/Home/Home";
import homeTest from "./Components/Home/homeTest";
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
    return (
      <>
        {/* allows for cross-browser support by resetting default css styling */}
        <CssBaseline />
        <div className="App">
          <Navbar
            loggedIn={this.state.loggedIn}
            setLoginState={this.setLoginState}
          />
          <Switch>
            <Route exact path="/Forum" component={Forum} />
            <Route
              exact
              path="/Forum/Topic/:id"
              render={(props) => <ThreadDetail {...props} />}
            />
            {this.state.loggedIn !== "null" || !this.state.loggedIn ? (
              <>
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/Applications"
                  component={ApplicationsContainer}
                />
                <Route
                  exact
                  path="/Interviews"
                  component={InterviewsContainer}
                />
              </>
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
      </>
    );
  }
}

export default App;
