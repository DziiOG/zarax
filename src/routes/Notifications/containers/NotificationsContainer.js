import 'react-native-gesture-handler';

import {connect} from 'react-redux';

import {
 
} from '../modules/notifications';
import Notifications from '../components/Notifications';

const mapStateToProps = state => ({
 
});

const mapActionsCreators = {
  
};

export default connect(mapStateToProps, mapActionsCreators)(Notifications);
