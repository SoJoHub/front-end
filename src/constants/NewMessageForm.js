// src/components/NewMessageForm.js

import React from "react";
import { API_ROOT, HEADERS } from "./index";

class NewMessageForm extends React.Component {
  state = {
    content: "",
    topic_id: this.props.topic_id,
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ topic_id: nextProps.topic_id });
  };

  handleChange = (e) => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_ROOT}/comments`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(this.state),
    });
    this.setState({ content: "" });
  };

  render = () => {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Comment:</label>
          <br />
          <input
            type="content"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewMessageForm;
