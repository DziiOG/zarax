import React, { Component } from 'react'
import Axios from 'axios';
import {connect} from 'react-redux';
import {getScreams, getScreamsAndNotificationsContext} from './routes/Home/modules/home'



const ProductContext = React.createContext();

 class ProductProvider extends Component {

    state = {
        userData: {}
    }

    componentDidMount(){
        const header = {
            headers: {
              Authorization: this.props.FBIToken,
            }
        }
        //console.log(this.props.userData.credentials.bio + "THIS IS FROM CONTEXT I REPEAT")
  
      
    }
   
    componentWillUnmount(){

       
    }

       
    
    render() {
        return (
           <ProductContext.Provider
           value={{...this.state,
           imageUrl: this.props.userData.credentials.imageUrl,
           email: this.props.userData.credentials.email,
           handle: this.props.userData.credentials.handle,
           getScreams: this.props.getScreams,
           notifications: this.props.notifications,
            
            setUserData: this.setUserData
          
           }}
           >
               {this.props.children}
           </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;
const mapStateToProps = state => ({
    token: state.signin.userToken || "",
    userData: state.signin.userData || "",
    loading: state.home.loading,
    notifications: state.signin.userData.notifications,
    FBIToken: state.signin.FBIToken || "",
    
});

const mapActionsCreators = {
 getScreams,
 
};



ProductProvider = connect(mapStateToProps, mapActionsCreators)(ProductProvider);
export {ProductProvider, ProductConsumer}
