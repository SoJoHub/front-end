import React from "react";
import { ActionCable } from "react-actioncable-provider";
import { API_ROOT } from "../constants/index";
import NewConversationForm from "../constants/NewConversationForm";
import MessagesArea from "../constants/MessagesArea";
import Cable from "../constants/Cable";

class ConversationsList extends React.Component {
  state = {
    topics: [],
    activeTopics: null,
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/topics`)
      .then((res) => res.json())
      .then((topics) => this.setState({ topics }));
  };

  handleClick = (id) => {
    this.setState({ activeTopics: id });
  };

  handleReceivedTopic = (response) => {
    const { topic } = response;
    this.setState({
      topics: [...this.state.topics, topic],
    });
  };

  handleReceivedComment = (response) => {
    console.log("hiiiiii!", response);
    const { comment } = response;
    const topics = [...this.state.topics];
    const topic = topics.find((topic) => topic.id === comment.topic_id);
    topic.comments = [...topic.comments, comment];
    this.setState({ topics });
  };

  render = () => {
    const { topics, activeTopics } = this.state;
    return (
      <div className="conversationsList">
        <ActionCable
          channel={{ channel: "TopicChannel" }}
          onReceived={this.handleReceivedTopic}
        />
        {this.state.topics.length ? (
          <Cable
            topics={topics}
            handleReceivedComment={this.handleReceivedComment}
          />
        ) : null}
        <h2>Topics</h2>
        <ul>{mapTopics(topics, this.handleClick)}</ul>
        <NewConversationForm />
        {activeTopics ? (
          <MessagesArea topic={findActiveTopics(topics, activeTopics)} />
        ) : null}
      </div>
    );
  };
}

export default ConversationsList;

// helpers

const findActiveTopics = (topics, activeTopics) => {
  return topics.find((topic) => topic.id === activeTopics);
};

const mapTopics = (topics, handleClick) => {
  return topics.map((topic) => {
    return (
      <li key={topic.id} onClick={() => handleClick(topic.id)}>
        {topic.title}
      </li>
    );
  });
};
