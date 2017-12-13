import React from "react";

import CommentFilter from "./CommentFilter";
import Comment from "./Comment";
import CommentField  from "./CommentField";

export default class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.setDefaultReplyFieldState(JSON.parse(props.data));
    this.AJAX_Headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
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
          return Date.parse(b.created_at) - Date.parse(a.created_at);
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
      } else {
        comment.replyField = false;
      }
    });

    this.setState(this.state);
  }

  createComment(comment_id, content) {
    const body = {
      comment: {
        project_id: this.state.id,
        comment_id: comment_id,
        content: content
      }
    }

    fetch("/comments", { 
      method: 'POST',
      headers: this.AJAX_Headers,
      body: JSON.stringify(body),
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status === "FAILURE") { return false; }
      if (data.comment.comment_id) {
        this.state.comments.forEach((comment) => {
          if (comment.id === comment_id) {
            comment.replies.unshift(data.comment);
          }
        });
      } else {
        this.state.comments.unshift(data.comment);
      }
      this.state.comments.forEach(comment => comment.replyField = false)
      this.setState(this.state);
    });
  }

  deleteComment() {

  }

  render() {
    const commentFunctions = {
      updateLike: this.updateLike.bind(this),
      openReplyField: this.openReplyField.bind(this),
      createComment: this.createComment.bind(this),
      deleteComment: this.deleteComment.bind(this)
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
        <CommentField createComment={this.createComment.bind(this)}/>
        <div id="comment-list">{comments}</div>
      </div>
    );
  }
}