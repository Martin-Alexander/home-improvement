import React from "react";

export default class Comment extends React.Component {
  render() {
    return(
      <div className="project-comment standard-border comment-spacing">
        <div>{this.props.content}</div>
      </div>
    );
  }
}