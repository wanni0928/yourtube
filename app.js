// console.log("hi");
// const express = require('express');
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import globalRouter from "./routers/globalRouter";
import helmet from "helmet" //보안강화
import morgan from "morgan"; //디버깅(?)
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

//middleware - 사용자와 가장 최근의 응답(response) 사이에 존재하는 소프트웨어 - 가끔 연결을 끊을수도 있다.
app.use(helmet());
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
// app.listen(PORT, handleListening);

export default app;