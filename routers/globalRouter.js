import express from "express";
import passport from "passport";
import routes from '../routes';
import {home, search} from "../controllers/videoController";
import {getJoin, postJoin, logout, getLogin, postLogin, githubLogin, postGithubLogIn, getMe, facebookLogin, postFacebookLogin} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

// globalRouter.get("/경로명", 익명의 함수.);
// mvc 패턴으로 효율적으로 다루기 위해, controller js에 해당 url 주소와 그 주소에 전달할 view(이 경우엔 pug)를 담은 함수를 지정하고, import 해서, 상황에 따라 필요한 함수이름을 선언하였다.

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

//github login
globalRouter.get(routes.github, githubLogin);
globalRouter.get(
    routes.githubCallback, 
    passport.authenticate('github', { failureRedirect: '/login' }),
    postGithubLogIn
);

globalRouter.get(routes.me, getMe);

//facebook login
globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
    routes.facebookCallback,
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    postFacebookLogin
);


export default globalRouter;