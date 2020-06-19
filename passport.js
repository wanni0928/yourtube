import passport from "passport";
import GitbubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import { githubLoginCallback, facebookLoginCallback } from "./controllers/userController";
import routes from "./routes";

// http://www.passportjs.org/docs/username-password/ 에서 일일이 구현해야할 코드가 어떻게 한줄의 함수로 줄여지는지 알 수 있다.
// https://github.com/saintedlama/passport-local-mongoose
//strategy is a way of login
passport.use(User.createStrategy());

passport.use(new GitbubStrategy(
        {
            clientID: process.env.GH_ID,
            clientSecret: process.env.GH_SECRET,
            callbackURL: `http://localhost:4000${routes.githubCallback}`
        },
            githubLoginCallback
    )
);

passport.use(new FacebookStrategy(
        {
            clientID: process.env.FB_ID,
            clientSecret: process.env.FB_SECRET,
            // callbackURL: `http://localhost:4000${routes.facebookCallback}`
            callbackURL: `https://40570ff7.ngrok.io${routes.facebookCallback}`,
            profileFields: ['id', 'displayName', 'photos', 'email'],
            scope: ["public_profile", "email"]
        },
            facebookLoginCallback
    )
);

// 공통적으로 많은 개발자들이 cookie로 id를 받고 그 id로 사용자를 인식한다.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());