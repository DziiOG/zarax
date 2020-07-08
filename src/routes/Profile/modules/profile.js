import update from "react-addons-update";
import constants from "./actionConstants";
import axios from "axios";
import final from "../../Home/modules/actionConstants";
import { getUserData } from "../../SignIn/modules/signinscreen";

const { LIKE_SCREAM, UNLIKE_SCREAM } = final;

const { SET_USER, UPLOAD_IMAGE, LOADING } = constants;
//actions


export function uploadImage(formData, header) {
 //("I am being executed");

  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    axios
      .post("/user/image", formData, header)
      .then(() => {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch(getUserData(header));
       // console.log("i have been successful you can check props now");
      })
      .catch((err) => {
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log(err);
      });
  };
}

export function editUserDetails(userDetails, header) {
 // console.log("I am being executed");

  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    axios
      .post("/user", userDetails, header)
      .then(() => {
        dispatch({
          type: LOADING,
          payload: false,
        });
        dispatch(getUserData(header));
       // console.log("i have been successful you can check props now");
      })
      .catch((err) => {
        dispatch({
          type: LOADING,
          payload: false,
        });
        console.log(err);
      });
  };
}

//handlers



function handleLoading(state, action) {
  return update(state, {
    loading: {
      $set: action.payload,
    },
  });
}





const ACTION_HANDLERS = {

  LOADING: handleLoading,
  
};

const initialState = {


};

export function profileReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
