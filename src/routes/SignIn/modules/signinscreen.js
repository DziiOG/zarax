import update from "react-addons-update";
import constants from './actionConstants';
import final from '../../Home/modules/actionConstants';
import axios from 'axios';

const { 
    GET_USER_TOKEN,  SIGN_USER_OUT, GET_FBITOKEN, SET_USER, WELCOM, MARK_NOTIFICATIONS_READ } = constants;

const {LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM } = final;  

//ACTIONS
export function markNotificationsRead(notificationsIds, header){
    return((dispatch) =>{
       axios.post('/user', notificationsIds, header).then(()=>{
           dispatch({
               type: MARK_NOTIFICATIONS_READ,
               payload: null
           })
       }).catch((err)=>{
           console.log(err);
       })
    })
}

export function getUserData(header){
    //console.log("I am being executed");
  
    return((dispatch)=>{
       axios.get('/user', header).then((res)=> {
           dispatch({
               type:SET_USER,
               payload: res.data
           })
         //  console.log("i have been successful you can check props now");
          // console.log(res.data)
       })
       .then(()=>{
           dispatch({
               type: WELCOME,
               payload: true
           })
       })
       .catch((err)=>{
           console.log(err)
       })
   })
 
}

export function setWelcome(){
    return((dispatch)=>{
        dispatch({
            type: WELCOME,
            payload: false
        })
    })
}


export function getUserToken(token){
    return((dispatch)=>{
        dispatch({
            type: GET_USER_TOKEN,
            payload: token
        })
    })
}


export function getUserFBIToken(token){
    return((dispatch)=>{
        dispatch({
            type: GET_FBITOKEN,
            payload: token
        })
    })
}



export function signUserOut(){
    return((dispatch)=>{
        dispatch({
            type: SIGN_USER_OUT,
            payload: ""
        })

        dispatch({
            type: WELCOME,
            payload: false
        })

    })
}




//Action handler


function handleGetUserToken(state, action){
    return update(state, {
        userToken: {
            $set: action.payload
        } 
    })
}


function handleGetFBIToken(state, action){
    return update(state, {
        FBIToken: {
            $set: action.payload
        } 
    })
}



function handleSignUserOut(state, action){
return update(state, {
        userToken: {
            $set: action.payload
        },
        FBIToken: {
            $set: action.payload
        }
    })
}
function handleLikeScream(state, action){
    return {
        ...state,
        userData : {
            ...state.userData,
            likes : [
                ...state.userData.likes,
                {
                    userHandle: state.userData.credentials.handle,
                    screamId: action.payload.screamId
                }

            ]
        }
        
    }
}

function handleUnLikeScream(state, action){
    return {
        ...state,
        userData: {
            ...state.userData,
            likes: state.userData.likes.filter((like) => like.screamId !== action.payload.screamId)
        }
    }
}


function handleSetUser(state, action){
    return update(state, {
        userData: {
            $set: action.payload
        }
        
    })
}

function handleWelcome(state, action){
    return update(state, {
        welcome: {
            $set: action.payload
        }
    })
}

function handleMarkNotificationsRead(state, action){
    state.userData.notifications.forEach((not) => (not.read = true));

    return{
        ...state
    }
}

const initialState = {
    userToken: "",
    FBIToken:"",
    userData: {},
    welcome: false
};

const ACTION_HANDLERS = {
   
    GET_USER_TOKEN: handleGetUserToken,
    SIGN_USER_OUT: handleSignUserOut,
    GET_FBITOKEN: handleGetFBIToken,
    SET_USER: handleSetUser,
    LIKE_SCREAM: handleLikeScream,
    UNLIKE_SCREAM: handleUnLikeScream,
    WELCOME: handleWelcome,
    MARK_NOTIFICATIONS_READ: handleMarkNotificationsRead
 }

export function signinscreenReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;

}