// 해당 url로 이동했을때, 그 url에 해당하는 view 요소와 데이터들을 가지고 오는 것은 controller의 역할이므로, controller js 를 따로 만들어서 분리한다.
import routes from '../routes';

export const users = (req, res) => res.render("users", {pageTitle : "Users"});
export const editProfile = (req, res) => res.render("editProfile", {pageTitle : "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword", {pageTitle : "Change Password"})
export const userDetail = (req, res) => res.render("userDetail", {pageTitle : "User Detail"});


export const getJoin = (req, res) => {
    res.render("join", {pageTitle : "Join"});
};

export const postJoin = (req, res) => {
    // console.log(req.body); // bodyParser를 사용하지 않으면, join폼에서 post 해도 데이터가 전달되지 않는다.
    const {
        body : {name, email, password, password2}
    } = req;
    if(password !== password2){
        res.status(400); // 400 means bad requset
        res.render("join", {pageTitle : "Join"});
    } else {
        // To Do: register User
        // To Dp: Log user in
        res.redirect(routes.home);
    }
};




export const getLogin = (req, res) => res.render("login", {pageTitle : "Login"});
export const postLogin = (req, res) => {
    // 나중에 사용자 비밀번호가 데이터베이스에 있는 것과 같은지 검사해야 한다.
    res.redirect(routes.home);
}
export const logout = (req, res) => res.render("logout", {pageTitle : "Logout"});