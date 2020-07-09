import "react-native-gesture-handler";

import { connect } from "react-redux";

import UserProfile from "../components/UserProfile";
import {
  getThisUserScreams,
  getScream,
  likeScream,
  unlikeScream,
  deleteScream,
  getScreamForZarax
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
  getScreamForZarax
};

export default connect(mapStateToProps, mapActionsCreators)(UserProfile);
