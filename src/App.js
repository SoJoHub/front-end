import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./Components/Nav/Navbar";
export default function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">{<Navbar />}</div>;
    </React.Fragment>
  );
}
