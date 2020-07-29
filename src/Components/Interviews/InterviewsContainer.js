import React from "react";
import Calendar from "./Calendar.js";
import AddInterview from './AddInterview.js'

export default class InterviewsContainer extends React.Component {
  state = {
    interviews: [],
  };

  componentDidMount() {
    let user = window.localStorage.getItem("sojohub");
    if (user) {
      const token = JSON.parse(user).userToken;
      fetch("http://localhost:3000/interviews", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      })
        .then((resp) => resp.json())
        .then((interviews) => {
          this.setState({
            interviews: interviews,
          });
        });
    }
  }


  addInterview = (interview) => {
    this.setState({
      interviews: [...this.state.interviews, interview],
    });
  };

  handleDelete = (deletedInterview) => {
    const updatedInterviews = this.state.interviews.filter(
      (interview) => interview.id !== deletedInterview.id
    );

    this.setState({
      interviews: updatedInterviews,
    });

    let user = window.localStorage.getItem("sojohub");
    const token = JSON.parse(user).userToken;
    fetch(`http://localhost:3000/interviews/${deletedInterview.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    });
  };

  render() {
    return (
      <div>
        <h1>Interviews Calendar</h1>
        <AddInterview addInterview={this.addInterview}/>
        <Calendar
          interviews={this.state.interviews}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
