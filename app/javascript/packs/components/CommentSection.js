import React from "react";

import CommentFilter from "./CommentFilter";
import Comment from "./Comment";

export default class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.setDefaultReplyFieldState(JSON.parse(props.data));

    console.log(this.state);
  }

  setDefaultReplyFieldState(protoState) {
    protoState.comments.forEach((comment) => {
      comment.replyField = false;
    });

    return protoState;
  }

  sortCommentsByFilter(filter) {
    this.state.comments.sort((a, b) => {
      switch (filter) {
        case "Active":
          return b.replies.length - a.replies.length;
        case "Top":
          return b.likes - a.likes;
        case "New":
          return Date.parse(a.created_at) - Date.parse(b.created_at);
      }
    });

    this.setState(this.state);
  }

  updateLike() {

  }

  openReplyField(commentId) {
    this.state.comments.forEach((comment) => {
      if (comment.id === commentId) {
        comment.replyField = !comment.replyField;
      }
    });

    this.setState(this.state);
  }

  createComment() {

  }

  deleteComment() {

  }

  render() {
    const self = this;

    const commentFunctions = {
      updateLike: this.updateLike.bind(self),
      openReplyField: this.openReplyField.bind(self),
      createComment: this.createComment.bind(self),
      deleteComment: this.deleteComment.bind(self)
    }

    const comments = this.state.comments.map((comment) => {
      return(
        <Comment 
          key={comment.id}
          comment={comment}
          user_id={this.state.user_id}
          commentFunctions={commentFunctions}
        />
      );
    });

    return(
      <div>
        <h2 className="bold-primary">Comments</h2>
        <div id="comment-filters">
          <CommentFilter filerFunction={this.sortCommentsByFilter.bind(this)} type="New" />
          <CommentFilter filerFunction={this.sortCommentsByFilter.bind(this)} type="Top" />
          <CommentFilter filerFunction={this.sortCommentsByFilter.bind(this)} type="Active" />
        </div>
        <div id="comment-list">{comments}</div>
      </div>
    );
  }
}