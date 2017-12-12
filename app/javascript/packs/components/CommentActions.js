import React from "react";

export default class CommentActions extends React.Component {
  render() {
    const actions = {}
    if (this.props.type === "comment") {
      actions.replyButton = <div className="reply-button lesser-underline bold-clickable">Reply</div>;
    }

    if (this.props.user_id === this.props.comment_user_id) {
      actions.deleteButton = <div className="delete-button lesser-underline bold-clickable">Delete</div>;
    }

    return(
      <div>
        {actions.replyButton}
        {actions.deleteButton}
      </div>
    );
  }
}