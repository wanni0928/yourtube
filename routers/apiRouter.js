import express from "express";
import routes from "../routes"
import {
    postRegisterView, postAddComment
} from "../controllers/videoController";

const apiRouter = express.Router();

// userRouter.get(routes.users, users);

// edit profile
// db와 같은 리소스들을 변경할 필요가 없으면 get. 그게 아니라면, post.
apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
export default apiRouter;