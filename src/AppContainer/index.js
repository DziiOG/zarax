import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Provider } from 'react-redux';
import MyDrawer from '../navigators/DrawerNavigator';
import { PersistGate } from 'redux-persist/integration/react'
import { ProductProvider } from '../context';
import { Root, View } from 'native-base';
import LottieView from 'lottie-react-native';







export default class AppContainer extends Component {
    render() {
        return (
            
            <Provider store={this.props.store}> 
            <PersistGate loading={
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                width: '100%'
            }}>
                <LottieView source={require('../assets/still.json')} autoPlay loop />
            </View>} persistor={this.props.persistor}>
                <ProductProvider>
                    <Root>
                            <MyDrawer></MyDrawer>
                    </Root>
                </ProductProvider>
            </PersistGate>
           
        </Provider>
        )
    }
}


AppContainer.propTypes = {
    store: PropTypes.object.isRequired,
};
