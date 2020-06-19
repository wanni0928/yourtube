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
const ME = "/me";

// Videos
// controller에서 어떤 data를 가지고 있다는 것을 표현하고 싶으면 더블클론(:)과 같은 이름을 넣으면 된다. ex) :id -> id 라는 변수의 데이터를 받는다.
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback"

// facebook
const FB = "/auth/facebook";
const FB_CALLBACK = "/auth/facebook/callback";

//API
const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";

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
    editVideo : (id) => {
        if(id){
            return `/videos/${id}/edit`;
        } else{
            return EDIT_VIDEO;
        }
    },
    deleteVideo : (id) => {
        if(id){
            return `/videos/${id}/delete`;
        } else {
            return DELETE_VIDEO;
        }
    },
    github: GITHUB,
    githubCallback: GITHUB_CALLBACK,
    me: ME,
    facebook: FB,
    facebookCallback: FB_CALLBACK,
    api : API,
    registerView : REGISTER_VIEW,
    addComment : ADD_COMMENT
};

export default routes;