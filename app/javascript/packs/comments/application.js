import React from "react";
import ReactDOM from "react-dom";
import addReplyFieldToComment from "./add-reply-field-to-comment";
import CommentField from "./comment-field";
import hiddenCommentForms from "./hidden-comment-forms";

// Reply button event listener
const replyButtonEventListener = (event) => {
  addReplyFieldToComment(event.currentTarget);
}

// Delete comment button event listener
const deleteCommentEventListener = (event) => {
  if (confirm("Are you sure you want to delete this comment?")) {
    const comment = event.currentTarget.parentNode;

    const deleteCommentForm = document.getElementById("delete-comment-form");

    deleteCommentForm.querySelector(".comment-form-comment-id").value = comment.id.split("-")[1]
    deleteCommentForm.querySelector(".silent-submit").click();

    comment.remove()
  }
}

const setUpCommentFields = () => {
  document.querySelectorAll(".delete-button").forEach((deleteButton) => {
    deleteButton.removeEventListener("click", deleteCommentEventListener);
    deleteButton.addEventListener("click", deleteCommentEventListener);
  });

  document.querySelectorAll(".reply-button").forEach((replyButton) => {
    replyButton.removeEventListener("click", replyButtonEventListener);
    replyButton.addEventListener("click", replyButtonEventListener);
  });
  
  ReactDOM.render(<CommentField forms={hiddenCommentForms()}/>, document.getElementById("new-comment"));
}

global.setUpCommentFields = setUpCommentFields;