// Returns an object containing all hidden forms necessary for comment CRUD
const hiddenCommentForms = () => {
  return {
    create: document.getElementById("create-comment-form"),
    delete: document.getElementById("delete-comment-form"),
    edit: document.getElementById("edit-comment-form")
  }
}

export default hiddenCommentForms;