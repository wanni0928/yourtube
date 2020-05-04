// 해당 url로 이동했을때, 그 url에 해당하는 view 요소와 데이터들을 가지고 오는 것은 controller의 역할이므로, controller js 를 따로 만들어서 분리한다.
import routes from '../routes';

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
  };
  
  export const postJoin = (req, res) => {
    const {
      body: { name, email, password, password2 }
    } = req;
    if (password !== password2) {
      res.status(400);
      res.render("join", { pageTitle: "Join" });
    } else {
      // To Do: Register User
      // To Do: Log user in``
      res.redirect(routes.home);
    }
  };
  
  export const getLogin = (req, res) =>
    res.render("login", { pageTitle: "Log In" });
  export const postLogin = (req, res) => {
    res.redirect(routes.home);
  };

  export const logout = (req, res) => {
    // To Do: process Logout
    res.redirect(routes.home);
  };
  
  // export const logout = (req, res) =>
  //   res.render("logout", { pageTitle: "Log Out" });
  export const userDetail = (req, res) =>
    res.render("userDetail", { pageTitle: "User Detail" });
  export const editProfile = (req, res) =>
    res.render("editProfile", { pageTitle: "Edit Profile" });
  export const changePassword = (req, res) =>
    res.render("changePassword", { pageTitle: "Change Password" });