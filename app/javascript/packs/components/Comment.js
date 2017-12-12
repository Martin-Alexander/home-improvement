import React from "react";

import CommentContentBase from "./CommentContentBase";
import Reply from "./Reply";

export default class Comment extends React.Component {
  render() {
    const replies = this.props.comment.replies.map((reply) => {
      return(
        <Reply 
          key={reply.id}
          comment={reply}
          user_id={this.props.user_id}
          commentFunctions={this.props.commentFunctions}
        />
      );
    });

    return(
      <div>
        <CommentContentBase 
          type="comment"
          comment={this.props.comment}
          user_id={this.props.user_id}
          commentFunctions={this.props.commentFunctions}
        />
        {replies}
      </div>
    );
  }
}