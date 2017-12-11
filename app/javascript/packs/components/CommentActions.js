import React from "react";

export default class CommentActions extends React.Component {
  render() {
    return(
      <div>
        <div className="reply-button lesser-underline bold-clickable">Reply</div>
        <div className="delete-button lesser-underline bold-clickable">Delete</div>
      </div>
    );
  }
}