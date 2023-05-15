import express from "express";
import usersController from "../controller/usersController";
import dashboardController from "../controller/dashboardController";
import validation from "../middleware/validation/validation";
import isLogin from "../middleware/auth/auth";
import protectedRoute from "../middleware/auth/protectedRoute";
import dokumenController from "../controller/dokumenController";
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function name(req, file, cb) {
    cb(null, path.join(__dirname, "../public"));
  },
  filename: function name(req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

// AUTH
router.get("/login", usersController.ViewLogin);
router.post(
  "/register",
  validation.RegisterValidation,
  usersController.Register
);
router.post("/login", usersController.Login);
router.get("/logout", usersController.Logout);
// END AUTH

router.use(isLogin);

// DASHBOARD
router.get(
  "/dashboard-admin",
  protectedRoute("admin"),
  dashboardController.dashboard
);
router.get(
  "/dashboard-user",
  protectedRoute("user"),
  dashboardController.dashboard
);
// upload.single("file")
router.get("/dokumen", dokumenController.View);
router.post("/dokumen-post", upload.single("file"), dokumenController.Store);
router.get("/dokumen/:filename", dokumenController.DownloadFile);
router.get("/dokumen-del/:id", dokumenController.Delete);
// END DASHBOARD
export default router;
