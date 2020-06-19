import express from "express";
import routes from "../routes"
import { users, userDetail, getEditProfile, me, postEditProfile, getChangePassword, postChangePassword } from "../controllers/userController";
import { onlyPrivate, uploadAvartar } from "../middlewares";
import { postEditVideo } from "../controllers/videoController";

const userRouter = express.Router();

// userRouter.get(routes.users, users);

// edit profile
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvartar, postEditProfile);
// change password
userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

// user detail
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);
// userRouter.get(routes.me, me);

export default userRouter;