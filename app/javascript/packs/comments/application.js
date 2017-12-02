import React from "react";
import ReactDOM from "react-dom";
import CommentField from "./comment-field";

const appendReplyFieldToElement = (element) => {
  ReactDOM.render(<CommentField />, element);
}

appendReplyFieldToElement(document.getElementById("new-comment"))