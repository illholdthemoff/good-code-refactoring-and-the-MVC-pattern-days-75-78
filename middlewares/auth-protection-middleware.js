function guardRoute(req, res, next) {
    if (!res.locals.isAuth) {
        return res.redirect("/401");
    }

    next(); // if user is auth, go next
}

module.exports = guardRoute;