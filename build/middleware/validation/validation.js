"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validatorjs_1 = __importDefault(require("validatorjs"));
const helper_1 = __importDefault(require("../../helpers/helper"));
const RegisterValidation = (req, res, next) => {
    const { nama, email, password, confirmPassword } = req.body;
    const data = {
        nama,
        email,
        password,
        confirmPassword,
    };
    const rules = {
        nama: "required|string|max:50",
        email: "required|email",
        password: "required|min:8",
        confirmPassword: "required|same:password",
    };
    const validate = new validatorjs_1.default(data, rules);
    if (validate.fails()) {
        return res
            .status(422)
            .send(helper_1.default.ResponseData(422, "validation error", validate.errors.errors, null));
    }
    next();
};
exports.default = { RegisterValidation };
