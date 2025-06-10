import  express  from "express";
import * as userController from "../../controllers/users/index";

const router = express.Router();
router.get("/", userController.getUsers);
router.post("/", userController.createUser);

export default router;