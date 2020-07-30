// src/components/NewConversationForm.js

import React from "react";
import { API_ROOT, HEADERS } from "./index";

class NewConversationForm extends React.Component {
  state = {
    title: "",
  };

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let user = window.localStorage.getItem("sojohub");
    const token = JSON.parse(user).userToken;

    fetch(`${API_ROOT}/topics`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(this.state),
    });
    this.setState({ title: "" });
    console.log(this.state);
    debugger;
  };

  render = () => {
    return (
      <div className="newConversationForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Conversation:</label>
          <br />
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewConversationForm;
