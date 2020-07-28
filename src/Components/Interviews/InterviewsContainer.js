import React from 'react';
import Calendar from './Calendar.js'

export default class InterviewsContainer extends React.Component {
    state = {
        interviews: []
    }

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

    render() {
        return (
            <Calendar interviews={this.state.interviews}/>
        )
    }
  }