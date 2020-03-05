export const home = (req, res) => res.render("home", {pageTitle : "Home"});
export const videos = (req, res) => res.render("video", {pageTitle : "Videos"});
export const upload = (req, res) => res.render("videoUpload", {pageTitle : "Video Upload"});
export const videDetail = (req, res) => res.render("videosDetail", {pageTitle : "Video Detail"});
export const editVideo = (req, res) => res.render("editVideos", {pageTitle : "Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideos", {pageTitle : "Delete Video"});
export const search = (req, res) => res.render("search", {pageTitle : "Search"});