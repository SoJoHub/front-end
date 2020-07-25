import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./Components/Nav/Navbar";
import ApplicationsContainer from "./containers/ApplicationsContainer";
import SignUp from "./Components/Signup/SignUp";

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <SignUp />
        {/* <ApplicationsContainer /> */}
      </div>
      ;
    </React.Fragment>
  );
}
