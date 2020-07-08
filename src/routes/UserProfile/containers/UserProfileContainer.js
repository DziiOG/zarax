import "react-native-gesture-handler";

import { connect } from "react-redux";

import UserProfile from "../components/UserProfile";
import {
  getThisUserScreams,
  getScream,
  likeScream,
  unlikeScream,
  deleteScream,
} from "../../Home/modules/home";

const mapStateToProps = (state) => ({
  screams: state.home.screamsOfUser || [],
  userInfo: state.home.userInfo || {},
  uiLoading: state.home.uiLoading,
  userData: state.signin.userData || {},
  FBIToken: state.signin.FBIToken || "",
});

const mapActionsCreators = {
  getThisUserScreams,
  getScream,
  likeScream,
  unlikeScream,
  deleteScream,
};

export default connect(mapStateToProps, mapActionsCreators)(UserProfile);
