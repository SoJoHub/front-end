import React from "react";
import Calendar from "./Calendar.js";
import AddInterview from './AddInterview.js'
import EditInterview from './EditInterview'

export default class InterviewsContainer extends React.Component {
  state = {
    interviews: [],
    editInterview : false,
    editInterviewObj: ""
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


  handleEdit = (editInterview) => {
    // const updatedInterviews = this.state.interviews.filter(
    //   (interview) => interview.id !== editInterview.id
    // );
    this.setState({editInterview: true})
    this.setState({editInterviewObj: editInterview})

    console.log(editInterview)

    // this.setState({
    //   interviews: editInterview,
    // });

    // let user = window.localStorage.getItem("sojohub");
    // const token = JSON.parse(user).userToken;
    // fetch(`http://localhost:3000/interviews/${editInterview.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: token,
    //     Accept: "application/json",
    //   },
    //   body: JSON.parse(editInterview)
    // });
  }

  editedInterview = (obj) => {
    this.setState((prevState) => ({
      ...prevState,
      editInterviewObj: obj
    }))
  }

  render() {
    console.log(this.state.editInterviewObj)
    return (
      <div>
        <h1>Interviews Calendar</h1>
        {this.state.editInterview ? <EditInterview   editInterview={this.editedInterview} interviewObj={this.state.editInterviewObj}/> : <AddInterview addInterview={this.addInterview}/>}
        
        <Calendar
          interviews={this.state.interviews}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          updatedInterview={this.state.editInterviewObj}
        />
      </div>
    );
  }
}
