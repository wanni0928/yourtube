// console.log("hi");
// const express = require('express');
import express from "express";
import morgan from "morgan"; //디버깅(?)
import helmet from "helmet" //보안강화
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router"

const app = express();

// const handleListening = () => console.log('Listening on: http://localhost:4000');

const handleHome = (request, response) =>  //express에서는 기본적으로 함수를 request, response로 다룬다.// console.log(request);
    response.send("Hello from homed");


const handleProfile = (request, response) => response.send("This is profile page"); //arrow function
//단순한 문장이 아닌, HTML,CSS등으로 마크업이 끝난 문서를 보내면 그것이 페이지가 된다.
 //또한 잘 짜여진 database까지 포함해서 보내면, 하나의 정적인 홈페이지가 완성되는 것이다.  

//middleware - 사용자와 가장 최근의 응답(response) 사이에 존재하는 소프트웨어 - 가끔 연결을 끊을수도 있다.
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);
app.get("/profile", handleProfile);
app.use("/user", userRouter);
// app.listen(PORT, handleListening);

export default app;