import React from "react";

import CommentFilter from "./CommentFilter";
import Comment from "./Comment";

export default class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(props.data);
  }

  render() {
    const comments = this.state.comments.map((comment) => {
      return(
        <Comment 
          key={comment.id}
          comment={comment}
          user_id={this.props.user_id}
          comment_id={this.props.id}
        />
      );
    });

    return(
      <div>
        <h2 className="bold-primary">Comments</h2>
        <div id="comment-filters">
          <CommentFilter type="New" />
          <CommentFilter type="Top" />
          <CommentFilter type="Active" />
        </div>
        <div id="comment-list">{comments}</div>
      </div>
    );
  }
}