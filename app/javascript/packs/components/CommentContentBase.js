import React from "react";

import ThumbsUpIcon from "./ThumbsUpIcon";
import CommentActions from "./CommentActions";
import CommentField from "./CommentField";

export default class CommentContentBase extends React.Component {
  render() {
    const comment = this.props.comment;
    if (this.props.comment.replyField) {
      var commentField = <CommentField 
        comment_id={comment.id}
        createComment={this.props.commentFunctions.createComment} 
      />
    } else {
      var commentField = null;
    }

    return(
      <div className={`project-${this.props.type} standard-border comment-spacing`}>
        <div className="comment-header">
          <div className="lesser-underline">{comment.user_full_name}</div>
          <div className="likes">
            <span>{comment.likes}</span>
            <ThumbsUpIcon is_liked={comment.is_liked}/>
          </div>
        </div>
        {comment.content}
        <CommentActions 
          type={this.props.type}
          comment_user_id={comment.user_id}
          user_id={this.props.user_id}
          comment_id={comment.id}
          deleteComment={this.props.commentFunctions.deleteComment}
          openReplyField={this.props.commentFunctions.openReplyField}
        />
        {commentField}
      </div>
    );
  }
}