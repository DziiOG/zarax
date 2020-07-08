import 'react-native-gesture-handler';

import {connect} from 'react-redux';

import {
 getUserID,
 getUserToken, 
 getUserName,
 signUserOut,
 getUserFBIToken,
 getUserData
} from '../modules/signinscreen';
import SignInScreen from '../components/SignInScreen';

const mapStateToProps = state => ({

 userToken: state.signin.userToken || "",
 username: state.signin.username || "",
 FBIToken: state.signin.FBIToken || "",
});

const mapActionsCreators = {
  getUserID,
  getUserToken,
  getUserName,
  signUserOut,
  getUserFBIToken,
  getUserData
};

export default connect(mapStateToProps, mapActionsCreators)(SignInScreen);
