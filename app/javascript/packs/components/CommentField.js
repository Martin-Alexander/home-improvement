import React from "react";
import ReactDOM from "react-dom";

export default class CommentField extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const form = this.props.forms.create;
    form.querySelector(".comment-form-comment-id").value = this.props.commentId || null
    form.querySelector(".comment-form-content").value = this.refs.textarea.value
    this.refs.textarea.value = "";
    form.querySelector(".silent-submit").click();
  }

  render() {
    const type = this.props.commentId ? "reply" : "comment"

    const wrapperStyle = {
      display: "flex",
      flexDirection: "column",
      padding: "10px"
    }

    const headerStyle = {
      marginBottom: "10px"
    }

    const textAreaStyle = {
      height: "80px",
      marginBottom: "10px",
      padding: "5px 8px",
      resize: "vertical"
    }

    const buttonStyle = {
      width: "100px"
    }

    return(
      <div className={type + "-field standard-border comment-spacing"}>
        <div style={wrapperStyle}>
          <h3 style={headerStyle} className="thin-primary">Leave a {type}</h3>
          <textarea ref="textarea" placeholder="Say something constructive..." style={textAreaStyle}></textarea>
          <button onClick={this.handleClick} className="btn btn-success square-borders" style={buttonStyle}>Send</button>
        </div>
      </div>
    )
  }
}