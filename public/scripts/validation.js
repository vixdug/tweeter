
function validateForm() {
    var x = document.forms["tweet-form"]["text"].value;
    if (x == "") {
        alert("Tweet must be filled out");
        return false;
    }
    if (x.length > 140) {
      alert("Oh no you didn't. Tweet can only be 140 characters")
    }
}
