import { Response, Request, NextFunction } from "express";
import passwordHelper from "../helpers/passwordHelper";
import Users from "../db/models/Users";
import helper from "../helpers/helper";

const ViewLogin = (req: Request, res: Response) => {
  const alertMessage = req.flash("alertMessage");
  const alertStatus = req.flash("alertStatus");
  const alert = { message: alertMessage, status: alertStatus };
  console.log(req.session.user);
  if (req.session.user == null || req.session.user === undefined) {
    return res.render("pages/auth/login", { alert });
  } else {
    return res.redirect("/dashboard-admin");
  }
};

const Register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nama, email, password, confirmPassword } = req.body;
    const hashed = await passwordHelper.PasswordHashing(password);
    const data = await Users.create({
      nama,
      email,
      password: hashed,
      verified: true,
      active: true,
      role: "user",
    });

    return res
      .status(201)
      .send(helper.ResponseData(201, "Created", null, data));
  } catch (error: any) {
    return res.status(500).send(helper.ResponseData(500, "Error", error, null));
  }
};

const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
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
      const matched = await passwordHelper.PasswordCompare(
        password,
        user.password
      );

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
  } catch (error: any) {
    return res.redirect("/login");
    // return res.status(500).send(helper.ResponseData(500, "Error", error, null));
  }
};

const Logout = async (req: Request, res: Response, next: NextFunction) => {
  req.session?.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Internal Server Error");
    }
    // Redirect to the login page or any other appropriate page
    return res.redirect("/login");
  });
};
export default { Register, Login, ViewLogin, Logout };
