import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'native-base'
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

export class SplashScreen extends Component {

    

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                     <LottieView source={require('../../../assets/bird.json')} autoPlay  />
                </View>
                <Animatable.View  
                animation="fadeInUpBig"
                style={styles.footer}>
                    <Text style={styles.title}>Stay connected with everyone</Text>
                    <Text style={styles.title}>Sign in with account</Text>
                    <View style={styles.button}>

                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SignInScreen')}}>
                            <LinearGradient colors={["#0C71E0","rgba(0, 0, 0, .5)"]}
                            style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {marginRight: 5} ]}>Sign In</Text>
                                <Icon
                                name="ios-arrow-dropright"
                                color="#fff"
                                size={20}
                                >

                                </Icon>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        marginTop: 30
                    }}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SignUpScreen')}}>
                          <Text style={{
                              textDecorationLine: 'underline',
                              textDecorationColor: '#d0d0d0'
                          }}>
                              Create an Account
                          </Text>
                    </TouchableOpacity>
                    </View>
                </Animatable.View>
                
            </View>
        )
    }
}

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff'
    },
    header:{
        flex:2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#000',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});





