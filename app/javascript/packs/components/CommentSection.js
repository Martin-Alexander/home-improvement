import React from "react";

import CommentFilter from "./CommentFilter";
import Comment from "./Comment";
import CommentField  from "./CommentField";

export default class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.setDefaultReplyFieldState(JSON.parse(props.data));
    this.AJAX_Headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    console.log(this.state);
  }

  // Sets replyField state (i.e., whether or not is has a reply field oppenned
  // underneath it) to all comments
  setDefaultReplyFieldState(protoState) {
    protoState.comments.forEach((comment) => {
      comment.replyField = false;
    });

    return protoState;
  }

  // Reorders comments according to the "new", "top", or "active" filter
  sortCommentsByFilter(filter) {
    this.state.comments.sort((a, b) => {
      switch (filter) {
        case "Active":                                   // Most replies
          return b.replies.length - a.replies.length;
        case "Top":                                      // Most likes
          return b.likes - a.likes;
        case "New":                                      // Most recently posted
          return Date.parse(b.created_at) - Date.parse(a.created_at);
      }
    });

    this.setState(this.state);
  }

  // Handles liking and de-liking for any comment
  updateLike(comment_id, commentWasLiked) {
    const fetchOptions = {};

    if (commentWasLiked) {
      fetchOptions.url = "/likes";
      fetchOptions.method = "POST"
    } else {
      fetchOptions.url = `/likes/${comment_id}`;
      fetchOptions.method = "DELETE";
    }

    fetch(fetchOptions.url, {
      method: fetchOptions.method,
      headers: this.AJAX_Headers,
      body: JSON.stringify({
        comment_id: comment_id
      }),
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status === "FAILURE") { return false; }
      this.findAndUpdateLikes(comment_id, commentWasLiked);

      this.setState(this.state);
    });
  }

  // Toggles a reply field and closes all others
  openReplyField(comment_id) {
    this.state.comments.forEach((comment) => {
      if (comment.id === comment_id) {
        comment.replyField = !comment.replyField;
      } else {
        comment.replyField = false;
      }
    });

    this.setState(this.state);
  }

  // Creation of a new comment or reply. Passing null as a comment_id will create
  // a top-level comment otherwise it will create a reply under that comment
  createComment(comment_id, content) {
    const body = {
      comment: {
        project_id: this.state.id,
        comment_id: comment_id,
        content: content
      }
    }

    fetch("/comments", { 
      method: 'POST',
      headers: this.AJAX_Headers,
      body: JSON.stringify(body),
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status === "FAILURE") { return false; }
      if (data.comment.comment_id) {
        this.state.comments.forEach((comment) => {
          if (comment.id === comment_id) {
            comment.replies.unshift(data.comment);
          }
        });
      } else {
        this.state.comments.unshift(data.comment);
      }
      this.state.comments.forEach(comment => comment.replyField = false)
      this.setState(this.state);
    });
  }

  // Deletes a given comment
  deleteComment(comment_id) {
    fetch(`/comments/${comment_id}`, { 
      method: 'DELETE',
      headers: this.AJAX_Headers,
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status === "FAILURE") { return false; }
      this.findAndDeleteComment(comment_id);
      this.setState(this.state);
    });
  }

  render() {
    const commentFunctions = {
      updateLike: this.updateLike.bind(this),
      openReplyField: this.openReplyField.bind(this),
      createComment: this.createComment.bind(this),
      deleteComment: this.deleteComment.bind(this)
    }

    const comments = this.state.comments.map((comment) => {
      return(
        <Comment 
          key={comment.id}
          comment={comment}
          user_id={this.state.user_id}
          commentFunctions={commentFunctions}
        />
      );
    });

    return(
      <div>
        <h2 className="bold-primary">Comments ({this.totalNumberOfComments()})</h2>
        <div id="comment-filters">
          <CommentFilter filerFunction={this.sortCommentsByFilter.bind(this)} type="New" />
          <CommentFilter filerFunction={this.sortCommentsByFilter.bind(this)} type="Top" />
          <CommentFilter filerFunction={this.sortCommentsByFilter.bind(this)} type="Active" />
        </div>
        <CommentField createComment={this.createComment.bind(this)}/>
        <div id="comment-list">{comments}</div>
      </div>
    );
  }

  // Runs through every comment and reply and applies a given function
  eachCommentAndReply(commentFunction) {
    this.state.comments.forEach((comment) => {
      commentFunction(comment);
      comment.replies.forEach(reply => commentFunction(reply));
    });
  }

  // Finds a comment by id and updates state to reflect new liked status
  findAndUpdateLikes(comment_id, commentWasLiked) {
    this.eachCommentAndReply((comment) => {
      if (comment.id === comment_id) {
        if (commentWasLiked) {
          comment.is_liked = true;
          comment.likes += 1;
        } else {
          comment.is_liked = false;
          comment.likes -= 1;            
        }
      }
    });
  }

  // Finds a comment/reply by id and deletes it from state
  findAndDeleteComment(comment_id) {
    this.state.comments.forEach((comment, index) => {
      if (comment.id === comment_id) {
        this.state.comments.splice(index, 1);
      }

      comment.replies.forEach((reply, index) => {
        if (reply.id === comment_id) {
          comment.replies.splice(index, 1);
        }
      });
    });
  }

  // Returns the total number of comments and replies
  totalNumberOfComments() {
    let total = 0;
    this.eachCommentAndReply(() => {
      total += 1;
    });
    return total;
  }
}