import { combineReducers } from 'redux';

import { homeReducer as home } from "../routes/Home/modules/home";
import { splashscreenReducer as splash } from "../routes/Splash/modules/splashscreen";
import { signupscreenReducer as signup } from "../routes/SignUp/modules/signupscreen";
import { signinscreenReducer as signin } from "../routes/SignIn/modules/signinscreen";





export const makeRootReducer = () => {
    return combineReducers({
        home,
        splash,
        signin,
        signup
    })
}

export default makeRootReducer;