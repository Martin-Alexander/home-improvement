import React from "react";

import CommentFilter from "./CommentFilter";

export default class CommentSection extends React.Component {
  render() {
    return(
      <div>
        <h2 className="bold-primary">Comments</h2>
        <div id="comment-filters">
          <CommentFilter type="New" />
          <CommentFilter type="Top" />
          <CommentFilter type="Active" />
        </div>
      </div>
    );
  }
}