
import { videos } from "../db";
import routes from "../routes";
// 해당 url로 이동했을때, 그 url에 해당하는 view 요소와 데이터들을 가지고 오는 것은 controller의 역할이므로, controller js 를 따로 만들어서 분리한다.
export const home = (req, res) => {
    res.render("home", { pageTitle: "Home", videos });
  };
  
export const search = (req, res) => {
  //console.log(req.query.term);
  // const searchingBy = req.query.term; //es6 이전 방식
  // const {} = req; //es6 방식
  const {query : {term : searchingBy}} = req; // searchingBy는 결국 term과 같은 값을 갖는다.
  // console.log(term);
  
  // const searchingBy = req.query.term;
  // res.render("search", {pageTitle : "Search", searchingBy : searchingBy});
  // searchingBy : searchingBy 이렇게 입력하지 않아도 Babel을 사용한다면, 이름이 같은 걸 봐서, 자동으로 인식해준다.
  res.render("search", {pageTitle : "Search", searchingBy, videos});
};

export const getUpload = (req, res) => res.render("upload", {pageTitle : "Video Upload"});
export const postUpload = (req, res) => {
  const {
    body: { file, title, description }
  } = req;
  // To Do: Upload and save video
  res.redirect(routes.videoDetail(324393));
};

// export const videos = (req, res) => res.render("video", {pageTitle : "Videos"});
export const videDetail = (req, res) => res.render("videosDetail", {pageTitle : "Video Detail"});
export const editVideo = (req, res) => res.render("editVideos", {pageTitle : "Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideos", {pageTitle : "Delete Video"});