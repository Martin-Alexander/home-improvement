import React from "react";
import ReactDOM from "react-dom";
import addReplyFieldToComment from "./add-reply-field-to-comment"
import CommentField from "./comment-field";

global.setUpCommentFields = () => {
  document.querySelectorAll(".reply-button").forEach((replyButton) => {
    replyButton.addEventListener("click", (event) => {
      addReplyFieldToComment(event.currentTarget);
    });
  });
  
  ReactDOM.render(<CommentField />, document.getElementById("new-comment"));
}
