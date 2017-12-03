import React from "react";
import ReactDOM from "react-dom";
import addReplyFieldToComment from "./add-reply-field-to-comment";
import CommentField from "./comment-field";
import hiddenCommentForms from "./hidden-comment-forms";

// Reply button button event listener
const replyButtonEventListener = (event) => {
  addReplyFieldToComment(event.currentTarget);
}

const setUpCommentFields = () => {
  document.querySelectorAll(".reply-button").forEach((replyButton) => {
    replyButton.removeEventListener("click", replyButtonEventListener);
    replyButton.addEventListener("click", replyButtonEventListener);
  });
  
  ReactDOM.render(<CommentField forms={hiddenCommentForms()}/>, document.getElementById("new-comment"));
}

global.setUpCommentFields = setUpCommentFields;