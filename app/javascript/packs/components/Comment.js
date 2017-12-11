import React from "react";

import CommentContentBase from "./CommentContentBase";
import Reply from "./Reply";

export default class Comment extends React.Component {
  render() {
    const replies = this.props.replies.map((reply) => {
      return(
        <Reply 
          key={reply.id}
          content={reply.content}
          user_full_name={reply.user_full_name}
          likes={reply.likes}
          is_liked={reply.is_liked}
        />
      );
    });

    return(
      <div>
        <CommentContentBase 
          content={this.props.content}
          user_full_name={this.props.user_full_name}
          likes={this.props.likes}
          type="comment"
          is_liked={this.props.is_liked}
        />        
        {replies}
      </div>
    );
  }
}