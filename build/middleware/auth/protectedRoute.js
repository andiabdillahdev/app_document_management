"use strict";
const protectedRoute = (roles) => {
    return (req, res, next) => {
        var _a;
        const userRole = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.role;
        if (userRole === roles) {
            next();
        }
        else {
            if (userRole == "admin") {
                return res.redirect("/dashboard-admin");
            }
            else {
                return res.redirect("dashboard-user");
            }
        }
    };
};
module.exports = protectedRoute;
