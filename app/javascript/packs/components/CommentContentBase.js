import React from "react";

import ThumbsUpIcon from "./ThumbsUpIcon";

export default class CommentContentBase extends React.Component {
  render() {
    return(
      <div className={`project-${this.props.type} standard-border comment-spacing`}>
        <div className="comment-header">
          <div className="lesser-underline">{this.props.user_full_name}</div>
          <div className="likes">
            <span>{this.props.likes}</span>
            <ThumbsUpIcon is_liked={this.props.is_liked}/>
          </div>
        </div>
        <div>{this.props.content}</div>
      </div>
    );
  }
}