
import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
// 해당 url로 이동했을때, 그 url에 해당하는 view 요소와 데이터들을 가지고 오는 것은 controller의 역할이므로, controller js 를 따로 만들어서 분리한다.

// async -> 너를 기다려주는 무언가. 자바스크립트는 동시에 많은 일을 해주지만,
//          일을 순차적으로 해결해주지는 않는다. 따라서, 데이터를 불러오고나서,
//          그 데이터를 렌더링을 해야하는 상황에서는 원하는 결과(데이터가 입력된 뷰)
export const home = async(req, res) => {
    try{
      const videos = await Video.find({
        // await 은 async가 선언된 함수 안에서만 사용가능.
        // 이 함수안의 기능이 끝나고 나서야, res.render가 작동한다.
        // 여기서 끝난다는 것은 '성공적'인게 아니라 오류든 뭐든 일단 결과가 나오는 상황을 의미한다.
        
      }).sort({_id : -1});
      res.render("home", { pageTitle: "Home", videos });
    } catch(error){
      console.log("error :", error);
      res.render("home", { pageTitle: "Home", videos: [] });
    }
  };
  
export const search = async(req, res) => {
  //console.log(req.query.term);
  // const searchingBy = req.query.term; //es6 이전 방식
  // const {} = req; //es6 방식
  const {query : {term : searchingBy}} = req; // searchingBy는 결국 term과 같은 값을 갖는다.
  // console.log(term);
  let videos = [];
  // const searchingBy = req.query.term;
  // res.render("search", {pageTitle : "Search", searchingBy : searchingBy});
  // searchingBy : searchingBy 이렇게 입력하지 않아도 Babel을 사용한다면, 이름이 같은 걸 봐서, 자동으로 인식해준다.

  // $regex는 정규식/ options의 i는 insecsitive 덜 미감함. 즉 대소문자 구분x
  try {
    videos = await Video.find({title: { $regex: searchingBy, $options: "i" }});
  } catch (error) {
    console.log(error);
  }

  res.render("search", {pageTitle : "Search", searchingBy, videos});
};

export const getUpload = (req, res) => res.render("upload", {pageTitle : "Video Upload"});

export const postUpload = async(req, res) => {
  const {
    // body come from upload.pug, file come from multer
      body: { title, description },
      file: { path }
    } = req;
  // console.dir(file, title, description);
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator : req.user.id
  });
  req.user.videos.push(newVideo);
  req.user.save();

  res.redirect(routes.videoDetail(newVideo.id));
};

// Video Detail
export const videDetail = async(req, res) => {
  const {
    params: {id}
  } = req;
  try {
    const video = await Video.findById(id).populate("creator").populate("comments");
    res.render("videosDetail", {pageTitle : video.title, video});
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async(req, res) => {
  const {
    params: {id}
  } = req;
  try {
    const video = await Video.findById(id);
    // 비디오 객체의 작성자 id 와 세션에 로그인 되있는 id와 불일치할 경우. 오류 던지기.
    if(video.creator !== req.user.id){
      throw Error();
    }else{
      res.render("editVideos", {pageTitle : `Edit ${video.title}`, video});
    }
  } catch (error) {
    res.render(routes.home);
  }
};

export const postEditVideo = async(req, res) => {
  //https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
  const {
    params: {id},
    body: {title, description}
  } = req;
  try {
    await Video.findOneAndUpdate({_id : id}, {title, description});
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async(req, res) => {
  // res.render("deleteVideos", {pageTitle : "Delete Video"});
  const {
    params: {id}
  } = req;

  try {
    // find 'id' & delete
    // https://mongoosejs.com/docs/api.html#model_Model.findOneAndRemove
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// Register Video View : api view
export const postRegisterView = async(req, res) => {
  const {
    params: {id}
  } = req;
  //find video -> view += 1
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end(); //서버하고만 소통하겠다.
  }
};

// Add Comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;
  // console.log(req);
  try {
    const video = await Video.findById(id);
    // console.log("video : ", video);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};