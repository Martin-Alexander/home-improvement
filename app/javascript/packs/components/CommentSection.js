import React from "react";

import CommentFilter from "./CommentFilter";
import Comment from "./Comment";

export default class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(props.data);
  }

  sortCommentsByFilter(filter) {
    this.state.comments.sort((a, b) => {
      switch (filter) {
        case "Active":
          return b.replies.length - a.replies.length;
        case "Top":
          return b.likes - a.likes;
        case "New":
          return 0;
      }
    });

    this.setState(this.state);
  }

  render() {
    const comments = this.state.comments.map((comment) => {
      return(
        <Comment 
          key={comment.id}
          comment={comment}
          user_id={this.state.user_id}
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