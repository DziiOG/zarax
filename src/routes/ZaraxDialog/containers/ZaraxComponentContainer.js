import 'react-native-gesture-handler';

import {connect} from 'react-redux';



import ZaraxDialog from '../components/ZaraxDialog';
import { 
    likeScream,
    unlikeScream,
    getScream,
    closeModal,
    openModal,
    postComment,
    getThisUserScreams

} from '../../Home/modules/home';

const mapStateToProps = state => ({
    userData: state.signin.userData || {},
    FBIToken: state.signin.FBIToken || "",
    azarax: state.home.azarax || {},
    uiLoading: state.home.uiLoading,
    loading:  state.home.loading,
    zarax: state.home.zarax || [],
    comments: state.home.azarax.comments || [],
    screamId: state.home.screamId || "",
    commentModal: state.home.commentModal
});

const mapActionsCreators = {
  likeScream,
  unlikeScream,
  getScream,
  closeModal,
  openModal,
  postComment,
  getThisUserScreams
};


export default connect(mapStateToProps, mapActionsCreators)(ZaraxDialog);
