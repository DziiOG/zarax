import 'react-native-gesture-handler';

import {connect} from 'react-redux';

import {
 
} from '../modules/notifications';
import Notifications from '../components/Notifications';
import { markNotificationsRead } from '../../SignIn/modules/signinscreen';

const mapStateToProps = state => ({
 notifications: state.signin.userData.notifications || []
});

const mapActionsCreators = {
    markNotificationsRead
};

export default connect(mapStateToProps, mapActionsCreators)(Notifications);
