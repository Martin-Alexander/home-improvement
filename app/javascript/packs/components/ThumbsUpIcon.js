import React from "react";

export default class ThumbsUpIcon extends React.Component {
  clickHandler() {
    this.props.updateLike(this.props.comment_id, !this.props.is_liked);
  }

  render() {
    const style = {};
    if (this.props.is_liked) { style.fontSize = "18px"; }

    return(
      <i onClick={this.clickHandler.bind(this)} className="fa fa-thumbs-o-up" aria-hidden="true" style={style}></i>
    );
  }
}