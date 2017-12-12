import React from "react";

export default class CommentFilter extends React.Component {
  clickHandler() {
    this.props.filerFunction(this.props.type);
  }

  render() {
    return(
      <span className="comment-filter" onClick={this.clickHandler.bind(this)}>{this.props.type}</span>
    );
  }
}