import React from "react";
import ReactDOM from "react-dom";
import CommentField from "./comment-field";

// Not all browsers give `NodeList` the `every` function
NodeList.prototype.every = Array.prototype.every;

// Triggered by clicking the `reply` button; it toggles a reply field on a comment
// and removes all other reply fields
const addReplyFieldToComment = (replyButtonElement) => {

  // TODO: refactor this to be more general/flexible
  const whateverIsBellowTheReplyButton = replyButtonElement.nextSibling.firstChild;
  if (whateverIsBellowTheReplyButton && whateverIsBellowTheReplyButton.classList.contains("reply-field")) {
    deleteAllOtherReplyFieldsOnPage();
  } else {
    deleteAllOtherReplyFieldsOnPage();

    const parentDivOfNewReplyField = document.createElement("div");
    replyButtonElement.insertAdjacentElement("afterend", parentDivOfNewReplyField);

    ReactDOM.render(<CommentField reply={true}/>, parentDivOfNewReplyField);
  }
}

// Prompts the user to confirm they want to discard unsaved changes
const userWantsToDiscardUnsavedChanges = () => {
  return confirm("You have unsaved changes. Are you sure you want to continue?");
}

// Returns whether or not there exists a reply field on the page that contains
// text (i.e., user began writting a reply but has not submitted it)
const aReplyFieldContainsText = (arrayOfReplyFields) => {
  return !arrayOfReplyFields.every((replyField) => {
    return replyField.querySelector("textarea").value === "";
  });
}

// Returns whether or not is safe to remove all reply fields. Either the user
// has no openned reply fields containing text or they do and they have confirmed
// that they are willing to discard unsaved changes
const areAllowedToRemoveAllReplyFields = (arrayOfReplyFields) => {
  return aReplyFieldContainsText(arrayOfReplyFields) ? userWantsToDiscardUnsavedChanges() : true
}

// Deletes all openned reply fields; propting the user for confirmation if they
// have unsaved changes
const deleteAllOtherReplyFieldsOnPage = () => {
  const allOtherReplyFields = document.querySelectorAll(".reply-field");
  
  if (areAllowedToRemoveAllReplyFields(allOtherReplyFields)) {
    allOtherReplyFields.forEach((replyField) => {
      replyField.remove();
    });
  }
}

export default addReplyFieldToComment;