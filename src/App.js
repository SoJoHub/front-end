import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./Components/Nav/Navbar";
import ApplicationsContainer from "./containers/ApplicationsContainer";
import SignUp from "./Components/Signup/SignUp";
import Signin from "./Components/Signin/Signin";
import { Route, Switch } from "react-router-dom";
export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Signin} />
          <Route exact path="/Applications" component={ApplicationsContainer} />
        </Switch>
      </div>
      ;
    </React.Fragment>
  );
}
