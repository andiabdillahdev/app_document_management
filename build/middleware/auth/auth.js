"use strict";
const isLogin = (req, res, next) => {
    //   return res.redirect("login");
    if (req.session.user == null || req.session.user == undefined) {
        return res.redirect("login");
    }
    else {
        next();
    }
};
module.exports = isLogin;
