import React, { Component, Fragment } from 'react'
import {  View, Dimensions, TouchableOpacity, Modal } from 'react-native';
import {  ListItem, Left, Body,  Thumbnail, Text } from 'native-base';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyIcon from 'react-native-vector-icons/MaterialIcons';
import MyIcon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import {
    Avatar,
    Paragraph
   
} from 'react-native-paper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient';

export default class ZaraxProfile extends Component {
    


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

      handleConfirmedDeletion = () => {
        const header = {
            headers: {
              Authorization: this.state.FBIToken,
            }
          };
          this.props.deleteScream(this.props.zarax.screamId, header);

          this.setState({
              modal: false
          });
      }

      likedZarax = () => {
          
          if(this.props.userData.likes && this.props.userData.likes.find((like)=> like.screamId === this.props.zarax.screamId)){
              return true
          } else {
              return false
          }
      }

      likeZarax = () => {
        const header = {
            headers: {
              Authorization: this.state.FBIToken,
            }
          };

          this.props.likeScream(this.props.zarax.screamId, header);

          
      }

      unlikeZarax = () => {
        const header = {
            headers: {
              Authorization: this.state.FBIToken,
            }
          };

          this.props.unlikeScream(this.props.zarax.screamId, header);

          
      }

      componentDidMount(){
          this.setState({
              FBIToken: this.props.FBIToken,
              userHandle: this.props.zarax.userHandle,
              userHandle2: this.props.userData.credentials.handle
          })

        //  console.log(this.props.userData.likes)
         // console.log("CHECKING")
         // console.log(this.likedZarax())
      }

      

      
      handleOnCommentPress = () => {
         // console.log("comment pressed")
      }

      sendToProfile = (userHandle, userHandle2) => {
       // this.props.navigation.navigate("User")
       if(userHandle2 === userHandle){
        this.props.navigation.navigate("Profile")
    }else{
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
        const { zarax: {body, createdAt, userImage, userHandle, screamId, likeCount, commentCount}} = this.props
        
        return (
            
            <ListItem style={{
                borderBottomColor: '#fff',
                
              }} button avatar>
                <Left>
                    <TouchableOpacity
                    onPress={()=>{

                         //   this.sendToProfile(this.state.userHandle, this.state.userHandle2)
                       
                        /*
                        if(this.props.userData.credentials.userHandle == userHandle){
                            this.props.navigation.navigate("Profile")
                        }else{
                            const header = {
                                headers: {
                                  Authorization: this.state.FBIToken,
                                }
                              };

                            //this.props.getThisUserScreams(userHandle, header)
                           // this.props.navigation.navigate("User")
                        }
                        
                                                   */
                    }}>
                        <Avatar.Image size={30} source={{ uri: userImage }} />
                    </TouchableOpacity>
                </Left>

                <View style={{

                    
                    flexDirection: 'column',
                    width: width * 0.6
                    
                    }}>
                        <TouchableOpacity
                        onPress={()=>{
                            const header = {
                                headers: {
                                  Authorization: this.state.FBIToken,
                                }
                              };
                            this.props.getScream(screamId, header);
                            this.props.navigation.navigate('Zarax')
                        }}
                        >

                                <Body >
                                    <Text>{userHandle}</Text>
                                    <Text style={{
                                        marginBottom: 10
                                    }} note>{body}</Text>
                                </Body>
                        </TouchableOpacity>

                    <View
                    style={{
                        flexDirection: 'row'
                    }}
                    >

                        <TouchableOpacity 
                         onPress={()=> {
                             this.likedZarax() == false ? this.likeZarax() : this.unlikeZarax()
                         }}
                        style={{

                            position: 'relative',
                            bottom: 20,
                            left: 20,
                            flexDirection: 'row'
                            

                            }}>
                                    <MyIcon name={this.likedZarax() == false ? "favorite-border" : "favorite"} color={this.likedZarax() == false ? "#d2d2d2" : "#ff0000"} size={18}></MyIcon>
                                    <Text style={{
                                        fontSize: 9,
                                        color: this.likedZarax() == false ? "#d2d2d2" : "#ff0000"
                                    }} note>{likeCount === 0 ? "": likeCount}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={()=>{
                                this.handleOnCommentPress()
                            }}

                        style={{
                            
                            position: 'relative',
                            bottom: 20,
                            left: 20,
                            flexDirection: 'row',
                            paddingHorizontal: 15


                            }}>
                                    <MyIcon2 name={"chat-outline"} color="#d2d2d2" size={18}></MyIcon2>
                                    <Text style={{
                                        fontSize: 9,
                                        color: "#d2d2d2"
                                    }} note>{commentCount === 0 ? "" : commentCount}</Text>
                        </TouchableOpacity>
                        
                                    {
                                     (this.props.userData.credentials.handle == userHandle) ?
                                     <Fragment>
                                          <TouchableOpacity 
                                                onPress={()=>{
                                                   this.setState({
                                                       modal: true
                                                   })
                                                }}

                                            style={{
                                                
                                                position: 'relative',
                                                bottom: 20,
                                                left: 20,
                                                flexDirection: 'row',
                                                paddingHorizontal: width * 0.27
                                                


                                                }}>
                                                        <MyIcon2 name={"delete"} color="#ffccce" size={18}></MyIcon2>
                                            </TouchableOpacity>

                                            <Modal visible={this.state.modal}  transparent={true} >
                                            <View  style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems:'center', }}>
                                                <View  style={{
                                                    
                                                    width: width * 0.9, 
                                                    height: height *0.25,  
                                                    backgroundColor: "#d2d2d2", 
                                                    borderBottomLeftRadius: 30,
                                                    borderTopRightRadius: 30,  
                                                    borderTopLeftRadius: 30,
                                                    borderBottomRightRadius: 30,}}>
                                                    <View>
                                                        <View style={{alignItems: 'center', margin: 15}}>
                                                            <Text>Confirm Deletion of this Post</Text>
                                                        </View>                                                        

                                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 15}}>
                                                                    {
                                                                        
                                                                    <TouchableOpacity disabled={this.props.loading} style={{ 
                                                                        width: width * 0.4,
                                                                        height: 50,
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        borderRadius: 10,}}
                                                                    onPress={()=>{this.handleConfirmedDeletion()}}
                                                                    >
                                                                        <LinearGradient
                                                                            colors={["#ff0000","rgba(0, 0, 0, .7)"]}
                                                                                                style={{ 
                                                                                                        width: '100%',
                                                                                                        height: 50,
                                                                                                        justifyContent: 'center',
                                                                                                        alignItems: 'center',
                                                                                                        borderRadius: 10,}}
                                                                                                                        >
                                                                            <Text style={[{
                                                                                                fontSize: 18,
                                                                                                fontWeight: 'bold'}, {
                                                                                color: '#fff'
                                                                            }]}> Delete</Text>
                                                                        </LinearGradient>
                                                                    </TouchableOpacity>
                                                                    }
                                                                </View>
                                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
                                                                    <TouchableOpacity onPress={()=>{this.setState({
                                                                        modal: false,  
                                                                        modalBio: "",
                                                                        modalOccupation: ""})}}>
                                                                        <Text style={{color: "#ff0000"}}>Cancel</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                    </View>   
                                                </View>

                                            </View>
                                        </Modal>

                                            
                                     </Fragment>
                                            : null
                                    }
                                 

                    </View>

                    
                </View>
                <View style={{
                   position: 'absolute',
                   top: 10,
                   right: 20,
                   
                }}>
                    <Text style={{
                        fontSize: 9
                    }} note>{dayjs(createdAt).fromNow()}</Text>
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