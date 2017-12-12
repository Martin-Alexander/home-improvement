import React from "react";

import CommentContentBase from "./CommentContentBase";

export default class Reply extends React.Component {
  render() {
    return(
      <CommentContentBase 
        type="reply"
        comment={this.props.comment}
        user_id={this.props.user_id}
        commentFunctions={this.props.commentFunctions}
      />
    );
  }
}