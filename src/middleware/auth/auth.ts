import { Request, Response, NextFunction } from "express";

const isLogin = (req: Request, res: Response, next: NextFunction) => {
  //   return res.redirect("login");
  if (req.session.user == null || req.session.user == undefined) {
    return res.redirect("login");
  } else {
    next();
  }
};

export = isLogin;
