import 'react-native-gesture-handler';

import {connect} from 'react-redux';

import {
 
} from '../modules/splashscreen';
import SplashScreen from '../components/SplashScreen';
import { setWelcome } from '../../SignIn/modules/signinscreen';

const mapStateToProps = state => ({
 
});

const mapActionsCreators = {
 setWelcome  
};

export default connect(mapStateToProps, mapActionsCreators)(SplashScreen);
