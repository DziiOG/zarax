import update from "react-addons-update";
import constants from "./actionConstants";
import axios from "axios";
import final from "../../SignIn/modules/actionConstants";
const { SET_NOTIFICATIONS} = final;

const {
  GET_SCREAMS,
  POST_COMMENT,
  LOADING,
  LIKE_SCREAM,
  POST_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  CLOSE_MODAL,
  OPEN_MODAL,
  GET_SINGLE_SCREAM,
  UI_LOADING,
  FETCH_PRESSED_SCREAM_ID,
  SET_SCREAMS_OF_USER,
  GET_SCREAM_FOR_ZARAX
  
} = constants;

//Actions

export function getScreamForZarax(screamId){
  return((dispatch)=>{
    dispatch({
      type:GET_SCREAM_FOR_ZARAX,
      payload:screamId
    })
  })
}


export function getThisUserScreams(userHandle, header) {
    return((dispatch)=>{
        dispatch({
            type: UI_LOADING,
            payload: true,
          });
          
          axios
            .get(`/user/${userHandle}`, header)
            .then((res) => {
              dispatch({
                type: UI_LOADING,
                payload: false,
              });
              dispatch({
                type: SET_SCREAMS_OF_USER,
                payload: res.data,
              });
             // console.log("I have failed")
            })
            .catch((err) => {
              dispatch({
                type: UI_LOADING,
                payload: false,
              });
              console.log(err);
            });
    })
}

export function fetchScreamId(screamId) {
  return (dispatch) => {
    dispatch({
      type: FETCH_PRESSED_SCREAM_ID,
      payload: screamId,
    });
  };
}

export function getScream(screamId, header) {
  return (dispatch) => {
    dispatch({
      type: UI_LOADING,
      payload: true,
    });
    dispatch(fetchScreamId(screamId));
    axios
      .get(`/scream/${screamId}`, header)
      .then((res) => {
        dispatch({
          type: UI_LOADING,
          payload: false,
        });
        dispatch({
          type: GET_SINGLE_SCREAM,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: UI_LOADING,
          payload: false,
        });
        console.log(err);
      });
  };
}

export function postScream(newScream, header) {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });

    axios
      .post("/scream", newScream, header)
      .then((res) => {
        dispatch(getScreams());

        dispatch({
          type: LOADING,
          payload: false,
        });

        dispatch({
          type: POST_SCREAM,
          payload: res.data,
        });
        dispatch({
          type: CLOSE_MODAL,
          payload: "zarax",
        });
      })
      .catch((err) => {
        dispatch({
          type: LOADING,
          payload: false,
        });

        console.log(err);
        alert(err);
      });
  };
}

export function postComment(newComment, screamId, header) {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });

    axios
      .post(`/scream/${screamId}/comment`, newComment, header)
      .then((res) => {
        dispatch(getScreams());

        dispatch({
          type: LOADING,
          payload: false,
        });

        dispatch({
          type: POST_COMMENT,
          payload: res.data,
        });
        dispatch({
          type: CLOSE_MODAL,
          payload: "comment",
        });
      })
      .catch((err) => {
        dispatch({
          type: LOADING,
          payload: false,
        });

        console.log(err);
        alert(err);
      });
  };
}

export function closeModal(type) {
  return (dispatch) => {
    dispatch({
      type: CLOSE_MODAL,
      payload: type,
    });
  };
}

export function openModal(type) {
  return (dispatch) => {
    dispatch({
      type: OPEN_MODAL,
      payload: type,
    });
  };
}

export function getScreams() {
 // console.log("I am being executed");

  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    axios
      .get("/screams")
      .then((res) => {
        dispatch({
          type: LOADING,
          payload: false,
        });

        dispatch({
          type: GET_SCREAMS,
          payload: res.data,
        });
       // console.log("i have been successful you can check props now");
        //console.log(res.data);
    
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

export function getScreamsAndNotificationsContext(header) {
  // console.log("I am being executed");
 
   return (dispatch) => {
 
     axios
       .get("/screams")
       .then((res) => {
       
         dispatch({
           type: GET_SCREAMS,
           payload: res.data,
         });
        // console.log("i have been successful you can check props now");
         //console.log(res.data);
     
       })
       .catch((err) => {
        
         console.log(err);
       });


       axios.get("/user", header).then((res)=>{
          dispatch({
            type: SET_NOTIFICATIONS,
            payload: res.data.notifications
          })
       }).catch((err)=>{
         console.log(err)
       })

   };
 }

export function deleteScream(screamId, header) {
  return (dispatch) => {
    axios
      .delete(`/scream/${screamId}`, header)
      .then(() => {
        dispatch({
          type: DELETE_SCREAM,
          payload: screamId,
        });

        dispatch(getScreams());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function likeScream(screamId, header) {
  return (dispatch) => {
    axios
      .get(`/scream/${screamId}/like`, header)
      .then((res) => {
        dispatch({
          type: LIKE_SCREAM,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function unlikeScream(screamId, header) {
  return (dispatch) => {
    axios
      .get(`/scream/${screamId}/unlike`, header)
      .then((res) => {
        dispatch({
          type: UNLIKE_SCREAM,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

//Action Handlers

function handleCloseModal(state, action) {
  if (action.payload === "comment") {
    return update(state, {
      commentModal: {
        $set: false,
      },
    });
  } else if (action.payload === "zarax") {
    return update(state, {
      zaraxModal: {
        $set: false,
      },
    });
  }
}

function handleOpenModal(state, action) {
  if (action.payload === "comment") {
    return update(state, {
      commentModal: {
        $set: true,
      },
    });
  } else if (action.payload === "zarax") {
    return update(state, {
      zaraxModal: {
        $set: true,
      },
    });
  }
}

function handleDeleteScream(state, action) {
  const index = state.zarax.findIndex(
    (zarax) => zarax.screamId === action.payload
  );
  state.zarax.splice(index, 1);

  return {
    ...state,
  };
}

function handleGetScreams(state, action) {
  return update(state, {
    zarax: {
      $set: action.payload,
    },
  });
}

function handleLoading(state, action) {
  return update(state, {
    loading: {
      $set: action.payload,
    },
  });
}

function handleUILoading(state, action) {
  return update(state, {
    uiLoading: {
      $set: action.payload,
    },
  });
}

function handleLikeScream(state, action) {
  let index = state.zarax.findIndex(
    (scream) => scream.screamId === action.payload.screamId
  );
  state.zarax[index] = action.payload;

  return {
    ...state,
    azarax: {
      ...state.azarax,
      likeCount: state.azarax.likeCount + 1
    }
  };
}

function handleUnLikeScream(state, action) {
  let index = state.zarax.findIndex(
    (scream) => scream.screamId === action.payload.screamId
  );
  state.zarax[index] = action.payload;

  return {
    ...state,
    azarax: {
      ...state.azarax,
      likeCount: state.azarax.likeCount - 1
    }
  };
}

function handlePostScream(state, action) {
  return {
    ...state,
    zarax: [action.payload, ...state.zarax],
  };
}

function handleGetScream(state, action) {
  return update(state, {
    azarax: {
      $set: action.payload,
    },
  });
}

function handleFetchScreamId(state, action) {
  return update(state, {
    screamId: {
      $set: action.payload,
    },
  });
}

function handlePostComment(state, action) {
  return {
    ...state,
    azarax: {
      ...state.azarax,
      comments: [...state.azarax.comments, action.payload],
    },
  };
}


function handleSetUserScreams(state, action){
    return update(state, {
        screamsOfUser: {
            $set: action.payload.screams
        },
        userInfo: {
            $set: action.payload.user
        }
    })
}


function handleGetSingleScreamForZarax(state, action){
  let index = state.zarax.findIndex(
    (scream) => scream.screamId === action.payload
  );
  
  
  return update(state, {
    azarax: {
      $set: state.zarax[index]
    }
  })
}

const ACTION_HANDLERS = {
  GET_SCREAMS: handleGetScreams,
  LOADING: handleLoading,
  LIKE_SCREAM: handleLikeScream,
  UNLIKE_SCREAM: handleUnLikeScream,
  DELETE_SCREAM: handleDeleteScream,
  CLOSE_MODAL: handleCloseModal,
  OPEN_MODAL: handleOpenModal,
  UI_LOADING: handleUILoading,
  GET_SINGLE_SCREAM: handleGetScream,
  FETCH_PRESSED_SCREAM_ID: handleFetchScreamId,
  POST_COMMENT: handlePostComment,
  SET_SCREAMS_OF_USER: handleSetUserScreams,
  GET_SCREAM_FOR_ZARAX: handleGetSingleScreamForZarax,
  POST_SCREAM: handlePostScream
};

const initialState = {
  zarax: [],
  azarax: {},
  loading: false,
  zaraxModal: false,
  uiLoading: false,
  screamId: "",
  commentModal: false,
  screamsOfUser: [],
  userInfo: {}
};

export function homeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
