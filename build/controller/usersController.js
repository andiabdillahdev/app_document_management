"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passwordHelper_1 = __importDefault(require("../helpers/passwordHelper"));
const Users_1 = __importDefault(require("../db/models/Users"));
const helper_1 = __importDefault(require("../helpers/helper"));
const ViewLogin = (req, res) => {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    console.log(req.session.user);
    if (req.session.user == null || req.session.user === undefined) {
        return res.render("pages/auth/login", { alert });
    }
    else {
        return res.redirect("/dashboard-admin");
    }
};
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nama, email, password, confirmPassword } = req.body;
        const hashed = yield passwordHelper_1.default.PasswordHashing(password);
        const data = yield Users_1.default.create({
            nama,
            email,
            password: hashed,
            verified: true,
            active: true,
            role: "user",
        });
        return res
            .status(201)
            .send(helper_1.default.ResponseData(201, "Created", null, data));
    }
    catch (error) {
        return res.status(500).send(helper_1.default.ResponseData(500, "Error", error, null));
    }
});
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield Users_1.default.findOne({
            where: {
                email: email,
            },
        });
        // return res.status(200).send({ message: email });
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        if (!user) {
            req.flash("alertMessage", "User tidak ditemukan");
            req.flash("alertStatus", "danger");
            return res.redirect("/login");
        }
        if (user && password !== null && user.password !== null) {
            const matched = yield passwordHelper_1.default.PasswordCompare(password, user.password);
            if (!matched) {
                req.flash("alertMessage", "Masukkan kata sandi yang benar");
                req.flash("alertStatus", "danger");
                return res.redirect("/login");
            }
        }
        req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role,
            nama: user.nama,
        };
        return res.redirect("/dashboard-admin");
    }
    catch (error) {
        return res.redirect("/login");
        // return res.status(500).send(helper.ResponseData(500, "Error", error, null));
    }
});
const Logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    (_a = req.session) === null || _a === void 0 ? void 0 : _a.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Internal Server Error");
        }
        // Redirect to the login page or any other appropriate page
        return res.redirect("/login");
    });
});
exports.default = { Register, Login, ViewLogin, Logout };
