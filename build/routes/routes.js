"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = __importDefault(require("../controller/usersController"));
const dashboardController_1 = __importDefault(require("../controller/dashboardController"));
const validation_1 = __importDefault(require("../middleware/validation/validation"));
const auth_1 = __importDefault(require("../middleware/auth/auth"));
const protectedRoute_1 = __importDefault(require("../middleware/auth/protectedRoute"));
const dokumenController_1 = __importDefault(require("../controller/dokumenController"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function name(req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../public"));
    },
    filename: function name(req, file, cb) {
        // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        // cb(null, file.fieldname + "-" + uniqueSuffix);
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = express_1.default.Router();
// AUTH
router.get("/login", usersController_1.default.ViewLogin);
router.post("/register", validation_1.default.RegisterValidation, usersController_1.default.Register);
router.post("/login", usersController_1.default.Login);
router.get("/logout", usersController_1.default.Logout);
// END AUTH
router.use(auth_1.default);
// DASHBOARD
router.get("/dashboard-admin", (0, protectedRoute_1.default)("admin"), dashboardController_1.default.dashboard);
router.get("/dashboard-user", (0, protectedRoute_1.default)("user"), dashboardController_1.default.dashboard);
// upload.single("file")
router.get("/dokumen", dokumenController_1.default.View);
router.post("/dokumen-post", upload.single("file"), dokumenController_1.default.Store);
router.get("/dokumen/:filename", dokumenController_1.default.DownloadFile);
router.get("/dokumen-del/:id", dokumenController_1.default.Delete);
// END DASHBOARD
exports.default = router;
