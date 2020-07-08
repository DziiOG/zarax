import React, { Component, Fragment } from 'react'
import { Text, View, Dimensions, StyleSheet, Platform, TouchableOpacity, TextInput, StatusBar, ActivityIndicator,  ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Icon, Left} from 'native-base'
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { ProductConsumer } from '../../../context';
import LottieView from 'lottie-react-native';

const isEmail = (email) => {
	const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(regEx)) return true;
	else return false;
};

export class SignInScreen extends Component {

    state={
        email:'',
        password:'',
        check_textInputChange: false,
        secureTextEntry: true,
        errors: {},
        token: '',
        loading: false,
       
    }

    textInputChange = (val) => {
        if(val.length !== 0 && isEmail(this.state.email)){
            this.setState({
                email: val,
                check_textInputChange: true
            })
        }else {
            this.setState({
                email: val,
                check_textInputChange: false
            })
        }

        //console.log(this.state.email)
    }

    handlePasswordChange = (val) => {
        this.setState({
            password: val,
           
        })
    }

    updateSecureTextEntry = () => {
        this.setState({
            secureTextEntry: !this.state.secureTextEntry
        })
    }

    handleSubmit = () => {
        this.setState({
          loading: true,
        });
    
        axios
          .post('/login', {
            email: this.state.email,
            password: this.state.password,
          })
          .then(results => {
            //console.log(results.data.token);
            this.setState({
              loading: false,
          
            });

            const FBIToken = `Bearer ${results.data.token}`;
            this.props.getUserFBIToken(FBIToken);

            
            axios.defaults.headers.common['Authorization'] = FBIToken;
            const header = {
                headers: {
                  Authorization: FBIToken,
                }
              };
            this.props.getUserData(header);
            
            this.props.getUserToken(results.data.token);
            
           

            //console.log(results.data) 
            //console.log(this.props.userToken)
    
          }).then(()=>{
           
              this.setState({
                email:'',
                password:'',
                check_textInputChange: false,
                secureTextEntry: true,
                errors: {},
                token: '',
                loading: false,
              })
              
          })
          .catch((err) => {
           // console.log(err.response.data);
           this.setState({
            loading: false,
          });
            
            //console.log(this.state.error)

            if(this.state.email === '' || this.state.password === ''){
                this.setState({
                    loading: false,
                   errors: {
                       general: "Email or Password should not be empty"
                   }
                  });
            }else if(isEmail(this.state.email)== false){
                this.setState({
                    loading: false,
                   errors: {
                       general: "Please Enter Valid Email Address"
                   }
                  });
            } else {
                this.setState({
                    loading: false,
                   errors: err.response.data
                  });
            }
           
          });
      };

    render() {
        return (
            <Fragment>
                {
                    this.state.loading == false ?

            <ImageBackground source={require('../../../assets/tre.jpg')} style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content"></StatusBar>
                <View style={styles.arrow}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('SplashScreen')}>
                        <Icon name="ios-arrow-back" style={{
                            color: '#d0d0d0'
                        }}></Icon>
                    </TouchableOpacity>
                </View>
               <View style={styles.header}>
                   <Text style={[styles.text_header, {color: '#fff'}]}>Welcome</Text>
                   <Text style={styles.text_header}>Back</Text>
               </View>
               <Animatable.View 
               animation="fadeInUpBig"
               style={styles.footer}>
                    
                    <View style={styles.action}>
                       <Icon
                       name="ios-person"
                       color="#000"
                       style={{
                           color: '#d0d0d0'
                       }}
                       size={20}
                       >

                       </Icon> 
                       <TextInput 
                       placeholder="Email" 
                       style={styles.textInput}
                       autoCapitalize="none"
                       onChangeText={(val)=> this.textInputChange(val)}
                       ></TextInput>
                       {
                        this.state.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                            duration={1500}
                        >
                            <Icon
                            name="ios-checkmark-circle"
                            color="green"
                            style={{
                           color: 'green'
                       }}
                            size={20}
                            ></Icon> 
                        </Animatable.View> : null
                       }
                    </View>
                    {
                        (this.state.errors)? <View>
                            <Text style={{color: '#ff0000'}}>{this.state.errors.general}</Text>
                        </View>: null
                    }
                    
                    <View style={styles.action}>
                       <Icon
                       name="lock"
                       color="#05375a"
                       style={{
                           color: '#d0d0d0'
                       }}
                       size={20}
                       >

                       </Icon> 
                       <TextInput 
                       placeholder="Password" 
                       secureTextEntry={this.state.secureTextEntry ? true : false}
                       style={styles.textInput}
                       autoCapitalize="none"
                       
                       onChangeText={(val)=> this.handlePasswordChange(val)}
                       ></TextInput>
                       <TouchableOpacity onPress={()=> {this.updateSecureTextEntry()}}>
                       {
                        (this.state.secureTextEntry) ?
                        <Icon
                        name="eye-off"
                        color="grey"
                        style={{
                           color: '#000'
                       }}
                        size={20}
                        ></Icon> : <Icon
                        name="eye"
                        color="grey"
                        style={{
                           color: 'grey'
                       }}
                        size={20}
                        ></Icon>
                       }
                       </TouchableOpacity>
                    </View>

                       <View style={styles.button}>
                       {
                       
                      <View style={{
                          justifyContent: 'space-around',
                          flexDirection: 'row',
        
                          alignItems: 'center'
                      }}>
                          <Text style={{
                              fontWeight: 'bold',
                              fontSize: 25
                          }}>Sign In</Text>
                          <TouchableOpacity onPress={()=>{ this.handleSubmit()}} style={{
                              backgroundColor: '#5cccee',
                              height: 80,
                              width: 80,
                              borderRadius: 80,
                              alignItems: 'center', 
                              justifyContent: 'center'
                          }}>
                                <Icon name="arrow-forward" style={{
                                    color: '#fff'
                                }}></Icon>
                          </TouchableOpacity>
                      </View>
                        
                        }
                               
                           <TouchableOpacity
                           onPress={()=> this.props.navigation.navigate('SignUpScreen')}
                           disabled={this.state.loading}
                           style={[styles.signIn], {
                               borderWidth: 1,
                               borderColor: "#5cccee",
                                width: '100%',
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                marginTop: 35
                           }
                           }
                           >
                               <Text styles={[styles.textSign, {
                                   color: 'rgba(90, 93, 165, 1)',
                                   
                               }]}>
                                   Sign Up
                               </Text>
                           </TouchableOpacity>
                       </View>
               </Animatable.View>
             
            </ImageBackground> : 
            <View style={{
                justifyContent: 'center', alignItems: 'center', flex:1, flexDirection: 'column'
            }}>
                <LottieView source={require('../../../assets/astro.json')}  autoPlay loop />
                <Text style={{
                    position: 'absolute',
                    bottom: 0
                }}>Please Wait...</Text>
            </View>
                }
            </Fragment>
        )
    }
}

export default SignInScreen;




const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    header:{
        flex:1,
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
        paddingBottom: 50,
        marginTop: 50
    },
    arrow: {
        paddingHorizontal: 30,
        paddingTop: 30
    },
    footer: {
        flex: 3,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    text_header: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a'
    },
    button: {
        
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});




