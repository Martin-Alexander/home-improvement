import React from "react";

import CommentContentBase from "./CommentContentBase";

export default class Reply extends React.Component {
  render() {
    return(
      <CommentContentBase 
        content={this.props.content}
        user_full_name={this.props.user_full_name}
        likes={this.props.likes}
      />
    );
  }
}