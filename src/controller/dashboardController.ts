import { Response, Request } from "express";
import path from "path";

const dashboard = (req: Request, res: Response) => {
  const user = req.session?.user;
  res.render("pages/dashboard/index", { user });
};

export default { dashboard };
