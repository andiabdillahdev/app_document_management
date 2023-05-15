"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
const routes_1 = __importDefault(require("./routes/routes"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.listen(process.env.APP_PORT, () => {
    console.log(`${process.env.APP_NAME} running in port ${process.env.APP_PORT}`);
    start_server();
});
const start_server = () => {
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((0, connect_flash_1.default)());
    app.use((0, cookie_parser_1.default)());
    // app.use("public", express.static("public"));
    app.use(body_parser_1.default.json());
    app.use((0, express_session_1.default)({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 90000 },
    }));
    app.get("/", function (req, res) {
        res.render("index");
    });
    app.set("view engine", "ejs");
    app.set("views", path_1.default.join(__dirname, "../views"));
    //   app.get("/login", function (req, res) {
    //     res.render("pages/auth/login");
    //   });
    app.use(routes_1.default);
    dbConnect_1.default;
};
