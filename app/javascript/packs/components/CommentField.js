import React from "react";
import ReactDOM from "react-dom";

export default class CommentField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {content: ""};
  }

  handleClick() {
    this.props.createComment(this.props.comment_id, this.state.content);
  }

  handleChange(event) {
    this.state.content = event.currentTarget.value;
    this.setState(this.state);
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
          <textarea onChange={this.handleChange.bind(this)}placeholder="Say something constructive..." style={textAreaStyle}></textarea>
          <button onClick={this.handleClick.bind(this)} className="btn btn-success square-borders" style={buttonStyle}>Send</button>
        </div>
      </div>
    )
  }
}