function postIsValid(title, content) {
  // checks if a post is valid by grabbing the title and the content and checking their validity and if its all good, it vlaidaties the post
  return title && content && title.trim() !== "" && content.trim() !== "";
}

function userCredentialsAreValid(email, confirmEmail, password) {
  return (
    email &&
    confirmEmail &&
    password &&
    password.trim().length >= 6 &&
    email === confirmEmail &&
    email.includes("@")
  );
}

module.exports = {
  postIsValid: postIsValid,
  userCredentialsAreValid: userCredentialsAreValid,
};
