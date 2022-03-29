const Post = require("../models/post"); // so the posts await in getAdmin can work.
const validationSession = require("../util/validation-session"); // including the validation for posts
const validation = require("../util/validation"); // functionalkisty to validate a given post, unlike the one on top which i figure

//the point behind having this document is to have all the details of what controls the posts and stuff all in a separate file from the blog.js which shows all the paths. This helps to make the reading of whats available for pathing on the site a lot simpler and easier, and the include at the top of blog.js will quickly point to where all the stuff that makes it work is (here)

function getHome(req, res) {
  res.render("welcome");
}

async function getAdmin(req, res) {
  const posts = await Post.fetchAll();

  sessionErrorData = validationSession.getSessionErrorData(req, {
    title: "",
    content: "",
  }); // grabbiong validation from the other file and setting it here

  res.render("admin", {
    posts: posts,
    inputData: sessionErrorData,
  });
}

async function createPost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!validation.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      function () {
        res.redirect("/admin");
      }
    );

    return; // or return res.redirect('/admin'); => Has the same effect
  }

  const post = new Post(enteredTitle, enteredContent);
  await post.save();

  res.redirect("/admin");
}

async function getSinglePost(req, res, next) {
  let post;
  try {
     post = new Post(null, null, req.params.id);
  } catch (error) {
    //next(error); // hands it to the default error handling middleweare, since it doesnt work properly by default when workign with promises
    return res.render("404"); // probably better way to do the above, since we expect it to lead to a page that doesnt exist.
  }
  
  await post.fetch();

  if (!post.title || !post.content) {
    return res.render("404");
  }

  sessionErrorData = validationSession.getSessionErrorData(req, {
    title: post.title,
    content: post.content,
  }); // grabbiong validation from the other file and setting it here

  res.render("single-post", {
    post: post,
    inputData: sessionErrorData,
  });
}

async function updatePost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!validation.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashErrorsToSession(
      // here we see, the data that it calls for is the message, title, content etc, and then the action is the redirect there bringing us back to the edit page.
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      function () {
        res.redirect(`/posts/${req.params.id}/edit`);
      }
    );

    return;
  }

  const post = new Post(enteredTitle, enteredContent, req.params.id);
  await post.save();

  res.redirect("/admin");
}

async function deletePost(req, res) {
  const post = new Post(null, null, req.params.id);
  await post.delete();
  res.redirect("/admin");
}

module.exports = {
  getHome: getHome,
  getAdmin: getAdmin,
  createPost: createPost,
  getSinglePost: getSinglePost,
  updatePost: updatePost,
  deletePost: deletePost,
};
