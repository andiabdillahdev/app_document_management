"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard = (req, res) => {
    var _a;
    const user = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user;
    res.render("pages/dashboard/index", { user });
};
exports.default = { dashboard };
