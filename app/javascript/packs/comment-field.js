import React from "react";
import ReactDOM from "react-dom";

class CommentField extends React.Component {
  render() {
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
      <div className="standard-border comment-spacing">
        <div style={wrapperStyle}>
          <h3 style={headerStyle} className="thin-primary">Leave a comment</h3>
          <textarea placeholder="Say something constructive..." style={textAreaStyle}></textarea>
          <button className="btn btn-success square-borders" style={buttonStyle}>Send</button>
        </div>
      </div>
    )
  }
}

export default CommentField