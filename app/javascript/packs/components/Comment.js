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
          uesr_id={this.props.user_id}
        />
      );
    });

    return(
      <div>
        <CommentContentBase 
          type="comment"
          comment={this.props.comment}
          uesr_id={this.props.user_id}
        />        
        {replies}
      </div>
    );
  }
}