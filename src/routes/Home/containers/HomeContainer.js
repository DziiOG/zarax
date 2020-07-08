
import {connect} from 'react-redux';

import {
 getScreams,
 likeScream,
 unlikeScream,
 deleteScream,
 closeModal,
 openModal,
 postScream,
 getScream,
 fetchScreamId,
 getThisUserScreams
} from '../modules/home';
import{
    getUserData
} from '../../SignIn/modules/signinscreen'
import Home from '../components/Home';


const mapStateToProps = state => ({
    userData: state.signin.userData || {},
    FBIToken: state.signin.FBIToken ||  "",
    zarax: state.home.zarax || [],
    azarax: state.home.azarax || {},
    loading: state.home.loading ,
    zaraxModal: state.home.zaraxModal,
    uiLoading: state.home.uiLoading
    
});

const mapActionsCreators = {
 getScreams,
 getUserData,
 likeScream,
 unlikeScream,
 deleteScream,
 closeModal,
 openModal,
 postScream,
 getScream,
 fetchScreamId,
 getThisUserScreams
};

export default connect(mapStateToProps, mapActionsCreators)(Home);