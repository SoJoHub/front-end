import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./Components/Nav/Navbar";
import ApplicationsContainer from "./containers/ApplicationsContainer";
import SignUp from "./Components/Signup/SignUp";
import Signin from "./Components/Signin/Signin";
import { Route, Switch } from "react-router-dom";


class App extends React.Component {

  state = {
    loggedIn: window.localStorage.getItem("sojohub")
  }

  setLoginState = () => {
    this.setState(prevState => ({
      loggedIn: !prevState.loggedIn
    }))
  }

  render(){
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <Navbar loggedIn={this.state.loggedIn} setLoginState={this.setLoginState}/>
          <Switch>
            {this.state.loggedIn !== "null" || !this.state.loggedIn ? (
              <Route exact path="/Applications" component={ApplicationsContainer} />
            ):(
              <>
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={Signin} />
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