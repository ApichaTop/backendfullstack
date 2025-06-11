import  express  from "express";
import * as authenController from "../../controllers/authen/index";
const router = express.Router();
router.post("/login", authenController.login);

export default router;