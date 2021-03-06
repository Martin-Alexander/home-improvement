function theLikeFunction(event) {
  var selectedLike = event.currentTarget;

  if (selectedLike.dataset.is_liked === "true") {

    // Set up form
    var hiddenLikesForm = document.getElementById("delete-like-form");
    hiddenLikesForm.action += "/" + selectedLike.dataset.comment_id;
    
    // Set thumbs-up icon size and likes number
    selectedLike.style.fontSize = "inherit";
    var numberOfLikes = selectedLike.previousElementSibling;
    numberOfLikes.innerHTML = parseInt(numberOfLikes.innerHTML) - 1;

    // Update dataset
    selectedLike.dataset.is_liked = "false";
  } else {
    var hiddenLikesForm = document.getElementById("create-like-form");
    hiddenLikesForm.action += "?comment_id=" + selectedLike.dataset.comment_id;
    
    selectedLike.style.fontSize = "18px";
    selectedLike.dataset.is_liked = "true";
  
    var numberOfLikes = selectedLike.previousElementSibling;
    numberOfLikes.innerHTML = parseInt(numberOfLikes.innerHTML) + 1;
  }
  hiddenLikesForm.submit();
  hiddenLikesForm.action = "/likes";
}