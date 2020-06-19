import multer from "multer";
import routes from "./routes";

//dest means destination
const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvartar = multer({dest: "uploads/avatars/"});

export const localsMiddleware = (req, res, next) => {
    //locals는 pug에 지역변수를 사용할 수 있게 해주는 함수이다.(로컬 변수 응답을 포함하는 객체.)
    res.locals.siteName = "YourTube";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    next();
};

export const onlyPublic = (req, res, next) => {
    if(req.user){
        res.redirect(routes.home);
    } else {
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect(routes.home);
    }
}

// 파일을 업로드 하면, 파일 이름이 아닌, 파일 URL을 뱉어내게 하는 미들웨어
// single은 오직 파일 하나만을 업로드 할 수 있게 한다는 뜻.
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvartar = multerAvartar.single("avartar"); 
// "videoFile" from input:file name="videoFile" in ./views/upload.pug