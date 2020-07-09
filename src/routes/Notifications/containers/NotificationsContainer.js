import 'react-native-gesture-handler';

import {connect} from 'react-redux';

import {
 
} from '../modules/notifications';
import Notifications from '../components/Notifications';
import { markNotificationsRead } from '../../SignIn/modules/signinscreen';
import { getScream } from '../../Home/modules/home';

const mapStateToProps = state => ({
 notifications: state.signin.userData.notifications || [],
 userData: state.signin.userData || {},
 FBIToken: state.signin.FBIToken || "",
});

const mapActionsCreators = {
    markNotificationsRead,
    getScream
};

export default connect(mapStateToProps, mapActionsCreators)(Notifications);
