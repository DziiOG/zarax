import update from "react-addons-update";
import constants from './actionConstants';
import axios from 'axios'
import final from '../../Home/modules/actionConstants';

const { LIKE_SCREAM, UNLIKE_SCREAM} = final;

const { 
     GET_USER_TOKEN, SIGN_USER_OUT, GET_FBITOKEN, SET_USER } = constants;

//ACTIONS

const initialState = {
   
};

const ACTION_HANDLERS = {
   
   
  
 
 }

export function signupscreenReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;

}