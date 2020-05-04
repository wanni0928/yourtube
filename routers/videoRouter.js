import express from "express";
import routes from "../routes"
import { videDetail, editVideo, deleteVideo, getUpload, postUpload } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, postUpload);

videoRouter.get(routes.videoDetail(), videDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);
// videoRouter.get(routes.videos, videos);

//export default 란 파일로 export 해준다는 뜻이다.
export default videoRouter;
