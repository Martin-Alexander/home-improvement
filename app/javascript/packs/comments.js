import React from "react";
import ReactDOM from "react-dom";

import CommentSection from "./components/CommentSection";

const commentSection = document.getElementById("comment-section");

ReactDOM.render(
  <CommentSection data={commentSection.dataset.comment_data} />,
  commentSection
);