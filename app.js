//app.js application 구현에 필요한 함수들을 담는 js

// console.log("hi");
// const express = require('express');
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import globalRouter from "./routers/globalRouter";
// import 뒤에 연파랑 글씨인 helmet, morgan 과 같은 문구들은 개인 편의성에 따라
// 얼마든지 바꿀 수 있다. 다만, from 뒤에 경로 혹은 라이브러리 이름은 정확하게 기입해야한다.
import helmet from "helmet" //보안강화
import morgan from "morgan"; //디버깅(?)
import routes from "./routes";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session"
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

//middleware - 사용자와 가장 최근의 응답(response) 사이에 존재하는 소프트웨어 - 가끔 연결을 끊을수도 있다.
app.use(helmet());

// Express에서 view engine으로 'pug'를 사용하도록 한다.
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

// cookie를 전달 받아서 사용할 수 있도록 만드는 미들웨어.
// 사용자 인증 같은 고에서 쿠키를 검사할때 사용한다.
app.use(cookieParser());

// bodyParser는 사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어.
// request 정보에서 form 혹은 json 형태로 된 body를 검사한다.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Morgan을 통해 로깅(logging) 활동을 활발히 할 수 있다.
app.use(morgan("dev"));
app.use(session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new CookieStore({mongooseConnection: mongoose.connection})
    })
);
app.use(passport.initialize());
app.use(passport.session());

// 페이지를 보여주기 전에, 로컬 변수에 응답할 수 있는 미들웨어를 하나 넣는다.
app.use(localsMiddleware);

//app.use("/경로명", 라우터 오브젝트);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);
// app.listen(PORT, handleListening);

// 이 파일을 import 할때, app Object를 넘기겠다는 의미로 선언한 함수.
export default app;