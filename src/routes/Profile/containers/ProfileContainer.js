import 'react-native-gesture-handler';

import {connect} from 'react-redux';

import {

 uploadImage,
 editUserDetails
} from '../modules/profile';

import Profile from '../components/Profile';
import { getUserData } from '../../SignIn/modules/signinscreen';

const mapStateToProps = state => ({
 userData: state.signin.userData || {},
 FBIToken: state.signin.FBIToken ||  "",
 loading: state.profile.loading

});

const mapActionsCreators = {
  getUserData,
  uploadImage,
  editUserDetails
};

export default connect(mapStateToProps, mapActionsCreators)(Profile);
