import React from "react";

export default class ThumbsUpIcon extends React.Component {
  render() {
    const style = {};
    if (this.props.is_liked) {
      style.fontSize = "18px";
    } else {
      style.fontSize = "inherit";
    }

    return(
      <i className="fa fa-thumbs-o-up" aria-hidden="true" style={style}></i>
    );
  }
}