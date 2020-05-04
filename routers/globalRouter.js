import express from "express";
import routes from '../routes';
import {home, search} from "../controllers/videoController";
import {getJoin, postJoin, logout, getLogin, postLogin} from "../controllers/userController";

const globalRouter = express.Router();

// globalRouter.get("/경로명", 익명의 함수.);
// mvc 패턴으로 효율적으로 다루기 위해, controller js에 해당 url 주소와 그 주소에 전달할 view(이 경우엔 pug)를 담은 함수를 지정하고, import 해서, 상황에 따라 필요한 함수이름을 선언하였다.
globalRouter.get(routes.home, home);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);


globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;