import  express  from "express";
import * as userController from "../../controllers/users/index";
import { AuthGuard } from "../../middlewares/auth.middleware";
import { RoleGuard } from "../../middlewares/role.middleware";

const router = express.Router();
router.get("/", AuthGuard, RoleGuard([1,2]), userController.getUsers);
router.post("/", userController.createUser);
router.put("/:id", AuthGuard, RoleGuard([1]), userController.updateUser);
router.delete("/:id", AuthGuard, RoleGuard([1]), userController.deleteUser);
export default router;