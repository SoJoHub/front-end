import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./Components/Nav/Navbar";
import ApplicationsContainer from "./containers/ApplicationsContainer";
import SignUp from "./Components/Signup/SignUp";
import Signin from "./Components/Signin/Signin";
export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">
        <Navbar />
        {/* <SignUp /> */}
        {/* <Signin /> */}
        <ApplicationsContainer />
      </div>
      ;
    </React.Fragment>
  );
}
