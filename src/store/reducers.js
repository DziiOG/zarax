import { combineReducers } from 'redux';

import { homeReducer as home } from "../routes/Home/modules/home";
import { splashscreenReducer as splash } from "../routes/Splash/modules/splashscreen";
import { signupscreenReducer as signup } from "../routes/SignUp/modules/signupscreen";
import { signinscreenReducer as signin } from "../routes/SignIn/modules/signinscreen";
import { profileReducer as profile } from "../routes/Profile/modules/profile";
import { notificationsReducer as notifications } from '../routes/Notifications/modules/notifications';





export const makeRootReducer = () => {
    return combineReducers({
        home,
        splash,
        signin,
        signup,
        profile,
        notifications
    })
}

export default makeRootReducer;