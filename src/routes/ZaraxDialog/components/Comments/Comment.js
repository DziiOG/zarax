import React, { Component, Fragment } from 'react'
import {  View, Dimensions, TouchableOpacity, Modal } from 'react-native';
import {  ListItem, Left, Body,  Thumbnail, Text } from 'native-base';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyIcon from 'react-native-vector-icons/MaterialIcons';
import MyIcon2 from 'react-native-vector-icons/MaterialCommunityIcons'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient';

export default class Comment extends Component {
    


    constructor(props) {
        super(props);
        this.state = {
            favorite: false,
            FBIToken:"",
            modal: false,
            userHandle: "",
            userHandle2: ""
            
        };
      }

      

      componentDidMount(){
        this.setState({
            FBIToken: this.props.FBIToken,
            userHandle: this.props.userHandle,
            userHandle2: this.props.userData.credentials.handle
        })

         // console.log(this.props.userData.likes)
         // console.log("CHECKING")
          
      }

      sendToProfile = (userHandle, userHandle2) => {
        // this.props.navigation.navigate("User")
        if(userHandle2 === userHandle){
         this.props.navigation.navigate("Profile")
             }          else{
         const header = {
             headers: {
               Authorization: this.state.FBIToken,
             }
           };
    
          // console.log(userHandle + userHandle2)
         this.props.getThisUserScreams(userHandle, header)
         this.props.navigation.navigate("User")
     }
    }

      

    
    render() {
        dayjs.extend(relativeTime);
        const { body, userHandle, createdAt, userImage } = this.props;
        return (
            
            <ListItem style={{
                borderBottomColor: '#fff',
                
              }} button avatar>
                        <Left>
                  <TouchableOpacity
                  onPress={()=>{
                    this.sendToProfile(this.state.userHandle, this.state.userHandle2)
                  }}
                  >
                            <Thumbnail circular={true} source={{ uri: userImage }} />
                  </TouchableOpacity>
                        </Left>

                <View style={{

                    
                    flexDirection: 'column',
                    width: width * 0.6
                    
                    }}>
                        <TouchableOpacity
                        onPress={()=>{
                         
                        }}
                        >

                                <Body >
                                    <Text>{userHandle}</Text>
                                    <Text style={{
                                        marginBottom: 10
                                    }} note>{body}</Text>
                                </Body>
                        </TouchableOpacity>

                   
                    
                </View>
                <View style={{
                   position: 'absolute',
                   top: 10,
                   right: 20,
                   
                }}>
                    <Text style={{
                        fontSize: 9
                    }} note>{dayjs(createdAt).format(`h:mm a, MMMM DD YYYY`)}</Text>
                </View>
               
          </ListItem>
        )
    }
}

/**
 *  <View style={{

                   position: 'relative',
                   bottom: 10,
                   left: 100,
                   
                   
                }}>
                   <MyIcon name={"favorite-border"} size={15}></MyIcon>
                </View>
 */