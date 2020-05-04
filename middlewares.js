import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    //locals는 pug에 지역변수를 사용할 수 있게 해주는 함수이다.(로컬 변수 응답을 포함하는 객체.)
    res.locals.siteName = "YourTube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: true,
        id: 1
    }
    next();
};