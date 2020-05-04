import express from "express";
import routes from "../routes"
import { videos, upload, videDetail, editVideo, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.deleteVideo, deleteVideo);
videoRouter.get(routes.editVideo, editVideo);
// videoRouter.get(routes.videos, videos);
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail, videDetail);

//export default 란 파일로 export 해준다는 뜻이다.
export default videoRouter;
