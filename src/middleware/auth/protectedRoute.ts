import { Request, Response, NextFunction } from "express";

const protectedRoute = (roles: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.session.user?.role;
    if (userRole === roles) {
      next();
    } else {
      if (userRole == "admin") {
        return res.redirect("/dashboard-admin");
      } else {
        return res.redirect("dashboard-user");
      }
    }
  };
};

export = protectedRoute;
