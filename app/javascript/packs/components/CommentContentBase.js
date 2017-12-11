import React from "react";

export default class CommentContentBase extends React.Component {
  render() {
    return(
      <div className={`project-${this.props.type} standard-border comment-spacing`}>
        <div className="comment-header">
          <div className="lesser-underline">{this.props.user_full_name}</div>
          <div className="likes">
            <span>{this.props.likes}</span>
            <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
          </div>
        </div>
        <div>{this.props.content}</div>
      </div>
    );
  }
}