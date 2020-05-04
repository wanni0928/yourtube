// URL의 경로 이름들을 담는 장소. 나중에 주소를 조합할때, 일일이 외울 수 없으므로, 존재하는 모든 URL들을 따로 모아서, 필요할 때마다 갖다 쓰도록 한다.

// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

const routes = {
    home : HOME,
    join : JOIN,
    login : LOGIN,
    logout : LOGOUT,
    search : SEARCH,
    users : USERS,
    userDetail : id => {
        if (id){
            return `/users/${id}`;
        } else {
            return USER_DETAIL;
        }
    },
    editProfile : EDIT_PROFILE,
    changePassword : CHANGE_PASSWORD,
    videos : VIDEOS,
    upload : UPLOAD,
    videoDetail : (id) => {
        if(id){
            return `/videos/${id}`;
        }else{
            return VIDEO_DETAIL;
        }
    },
    editVideo : EDIT_VIDEO,
    deleteVideo : DELETE_VIDEO
};

export default routes;