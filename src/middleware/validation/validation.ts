import Validator from "validatorjs";
import { Response, Request, NextFunction } from "express";
import helper from "../../helpers/helper";

const RegisterValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nama, email, password, confirmPassword } = req.body;

  const data = {
    nama,
    email,
    password,
    confirmPassword,
  };

  const rules: Validator.Rules = {
    nama: "required|string|max:50",
    email: "required|email",
    password: "required|min:8",
    confirmPassword: "required|same:password",
  };

  const validate = new Validator(data, rules);

  if (validate.fails()) {
    return res
      .status(422)
      .send(
        helper.ResponseData(
          422,
          "validation error",
          validate.errors.errors,
          null
        )
      );
  }

  next();
};

export default { RegisterValidation };
