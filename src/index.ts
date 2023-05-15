import express from "express";
import dotenv from "dotenv";
import sequalizeConnection from "./config/dbConnect";
import routes from "./routes/routes";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

type User = {
  id: number | null;
  email: string | null;
  role: string | null;
  nama: string | null;
};

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

app.listen(process.env.APP_PORT, () => {
  console.log(
    `${process.env.APP_NAME} running in port ${process.env.APP_PORT}`
  );

  start_server();
});

const start_server = () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(flash());
  app.use(cookieParser());
  // app.use("public", express.static("public"));
  app.use(bodyParser.json());

  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 90000 },
    })
  );

  app.get("/", function (req, res) {
    res.render("index");
  });
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "../views"));
  //   app.get("/login", function (req, res) {
  //     res.render("pages/auth/login");
  //   });
  app.use(routes);
  sequalizeConnection;
};
