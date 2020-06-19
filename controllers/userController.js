// 해당 url로 이동했을때, 그 url에 해당하는 view 요소와 데이터들을 가지고 오는 것은 controller의 역할이므로, controller js 를 따로 만들어서 분리한다.
import passport from "passport";
import routes from '../routes';
import User from '../models/User';

//Join
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    // Join user
    try {
      //User.create({}); 이 함수로 진행할 경우, 사용자가 가입하는 순간 DB에 저장된다. 때문에, user를 등록하려고 해도. 이미 DB에 저장되어 있기 때문에 가입을 못 시켜준다.
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
    }
    // To Do: Log user in``
  }
};

//Login
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const githubLogin = passport.authenticate('github');
export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
  const {
    _json: {id, avatar_url, name, email}
  } = profile;
  try {
    const user = await User.findOne({email});
    if(user){
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avartarUrl: avatar_url
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
}

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
}

export const facebookLogin = passport.authenticate('facebook');
export const facebookLoginCallback = async (accessToken, refreshToken, profile, cb) => {
  const {_json: {id, name,  email}} = profile;
  try {
    const user = await User.findOne({email});
    if(user){
      user.facebookId = id;
      user.avartarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avartarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
}

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
}

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id).populate("videos");
  res.render("userDetail", { pageTitle: "User Detail", user});
  // console.log(user);
}

// export const logout = (req, res) =>
//   res.render("logout", { pageTitle: "Log Out" });
export const userDetail = async (req, res) =>{
  const { params: {id}} = req;
  try {
    const user = await User.findById(id).populate("videos");
    console.log(user);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
}

//edit Profile
export const getEditProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });
export const postEditProfile = async (req, res) => {
  const {
    body:{name, email},
    file
  } = req;
  console.log(req.user);
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avartarUrl: file ? file.path : req.user.avartarUrl
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
}

//change Password
export const getChangePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });
export const postChangePassword = async (req, res) => {
  const {
    body : {
      oldPassword,
      newPassword,
      newPassword1
    }
  } = req;

  try {
    if(newPassword !== newPassword1) {
      res.status(400); // status 200일 경우, 크롬에서 자꾸 비번을 저장할래? 같은 메세지가 뜰 것이다.
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};
