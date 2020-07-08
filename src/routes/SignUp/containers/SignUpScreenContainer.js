import 'react-native-gesture-handler';

import {connect} from 'react-redux';

import {

  getUserToken,
 signUserOut,
 getFBIToken,
 getUserData,
 getUserFBIToken
} from '../../SignIn/modules/signinscreen';
import SignUpScreen from '../components/SignUpScreen';



const mapStateToProps = state => ({
 userToken: state.signin.userToken || "",
 FBIToken: state.signin.FBIToken || "",
});

const mapActionsCreators = {
  getUserToken,
  signUserOut,
  getFBIToken,
  getUserData,
  getUserFBIToken
};

export default connect(mapStateToProps, mapActionsCreators)(SignUpScreen);
