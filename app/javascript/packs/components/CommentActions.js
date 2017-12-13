import React from "react";

export default class CommentActions extends React.Component {
  replyClick() {
    this.props.openReplyField(this.props.comment_id);
  }

  deleteClick() {
    this.props.deleteComment(this.props.comment_id);
  }

  render() {
    const actions = {}
    if (this.props.type === "comment" && this.props.user_id) {
      actions.replyButton = <div 
        onClick={this.replyClick.bind(this)}
        className="reply-button lesser-underline bold-clickable">
        Reply
      </div>;
    }

    if (this.props.user_id === this.props.comment_user_id) {
      actions.deleteButton = <div 
        onClick={this.deleteClick.bind(this)} 
        className="delete-button lesser-underline bold-clickable">
        Delete
      </div>;
    }

    return(
      <div>
        {actions.replyButton}
        {actions.deleteButton}
      </div>
    );
  }
}