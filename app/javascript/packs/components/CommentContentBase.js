import React from "react";

import ThumbsUpIcon from "./ThumbsUpIcon";
import CommentActions from "./CommentActions";

export default class CommentContentBase extends React.Component {
  render() {
    const comment = this.props.comment;

    return(
      <div className={`project-${this.props.type} standard-border comment-spacing`}>
        <div className="comment-header">
          <div className="lesser-underline">{comment.user_full_name}</div>
          <div className="likes">
            <span>{comment.likes}</span>
            <ThumbsUpIcon is_liked={comment.is_liked}/>
          </div>
        </div>
        <div>{comment.content}</div>
        <CommentActions uesr_id={this.props.user_id}/>
      </div>
    );
  }
}