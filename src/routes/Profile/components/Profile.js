import React, { Component, Fragment } from 'react'
import { Text, View, Icon, } from 'native-base';
import MyIcon from 'react-native-vector-icons/MaterialIcons'
import MyIcon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import dayjs from 'dayjs'
import LottieView from 'lottie-react-native';
import {  Dimensions, Modal, TextInput, ActivityIndicator,Image } from 'react-native'
//import HeaderComponent from '../../../Components/Header'
import LinearGradient from 'react-native-linear-gradient';
import {
    Avatar,
    Paragraph
   
} from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { ProductConsumer } from '../../../context';
import ImagePicker from 'react-native-image-picker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const options = {
    title: 'Select Avatar',
    customButtons: [],
    storageOptions: {
      skipBackup: true,
      path: 'images' ,
    },
  };

export default class Profile extends Component {
    state = {
      bio: "",
      website: "",
      location: "",
      modal: false,
      
     
    }

    componentDidMount(){
            this.setState({
                bio:this.props.userData.credentials.bio ,
                website:  this.props.userData.credentials.website ,
                location:  this.props.userData.credentials.location ,
            })
          // console.log(this.props.userData.credentials.bio)
    }

    handleImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
          //  console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
              alert(response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
           
          var photo = {
            uri: source.uri,
            type: 'image/jpeg',
             name: 'photo.jpg',
          };

          const header = {
            headers: {
              Authorization: this.props.FBIToken,
            }
          };


          const formData = new FormData();
          formData.append('image', photo, photo.name);
          this.props.uploadImage(formData, header)
            }
          });


    }
  

        textInputChange = (val, type) => {
            if(type == "modalBio"){
                this.setState({
                    bio: val
                })
            }else if(type == "modalLocation"){
                this.setState({
                    location: val
                })
            }else if (type == "modalWebsite"){
                this.setState({
                    website: val
                })
            }
        }
        
        handleSubmit = () =>{
            

                        if(this.state.bio == "" || this.state.location == "" || this.state.website == ""){
                            alert("None of the Fields must be empty")
                        }else{
                            
                            const header = {
                                headers: {
                                  Authorization: this.props.FBIToken,
                                }
                              };

                              const userDetails = {
                                  bio: this.state.bio,
                                  website: this.state.website,
                                  location: this.state.location
                              }

                              this.props.editUserDetails(userDetails, header);
                              
                              this.setState({
                                    modal: false
                                })
                       
                        }
        
        }
  
      
    render() {
        return (
           

               
                            <ProductConsumer>
                                {
                                    (value)=> (

                                    <Fragment>
                                        
                                        <View style={{alignItems: 'center', flex: 1, margin: 15}}>
                                            {
                                                (this.props.loading == false) ?
                                            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{this.handleImage()}}>

                                                <Avatar.Image source={{
                                                    uri: this.props.userData.credentials.imageUrl
                                                }} size={170}>

                                                </Avatar.Image>
                                                <View style={{position:"absolute", bottom:0, right:0}}>

                                                    <MyIcon size={30} name="edit"></MyIcon>
                                                </View>
                                            </TouchableOpacity> : 
                                            <View style={{
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                                flex: 1,
                                                height: 50,
                                                width: 50,
                                                position: "absolute",
                                                right: width * 0.43
                                              }}>
                                                 <LottieView source={require('../../../assets/relax.json')} autoPlay loop />
                                              </View>
                                            }
                                            <TouchableOpacity style={{margin: 15}} onPress={()=>{
                                                this.setState({
                                                    modal: true
                                                })
                                            }}>
                                                <Text style={{color: "#d2d2d2"}}>
                                                    Edit Profile
                                                </Text>
                                            </TouchableOpacity>

                                            <View style={{flexDirection: 'row', 
                                            padding: 5, 
                                            margin: 10, 
                                            textAlign: 'center', 
                                            borderRadius: 15, 
                                            backgroundColor: 'rgba(0,0,0,.4)'
                                            }}>
                                                <TouchableOpacity>
                                                        <Text style={{fontSize: 18, fontWeight: '400', paddingRight: 5, color: '#fff'}}>
                                                                {"@"}{this.props.userData.credentials.handle}
                                                        </Text>
                                                </TouchableOpacity>
                                                
                                                <Text style={{fontSize: 12, fontWeight: '400', paddingLeft: 5,textAlign: 'center', borderLeftWidth: 1, margin: 3, color: '#d2d1d2' }}>
                                                    {this.props.userData.credentials.email}
                                                </Text>
                                            </View>
                                            <View style={{flexWrap: 'wrap', }}>

                                                <Paragraph style={{textAlign: 'center',margin: 0, color: '#ccc', lineHeight: 24, flexWrap: 'wrap'}}>
                                                {this.props.userData.credentials.bio}
                                                </Paragraph>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems:'center' }}>
                                                <MyIcon name="add-location" size={20} style={{marginRight: 5}}></MyIcon>
                                                <Paragraph style={{textAlign: 'center',margin: 0, color: '#ccc', lineHeight: 24, flexWrap: 'wrap'}}>
                                                    {this.props.userData.credentials.location}
                                                </Paragraph>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems:'center' }}>
                                                <MyIcon2 name="paperclip" size={20} style={{marginRight: 5}}></MyIcon2>
                                                <Paragraph style={{textAlign: 'center',margin: 0, color: '#ccc', lineHeight: 24, flexWrap: 'wrap'}}>
                                                    {this.props.userData.credentials.website}
                                                </Paragraph>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems:'center' }}>
                                                 <MyIcon2 name="calendar" size={20} style={{marginRight: 5}}></MyIcon2>
                                                <Paragraph style={{textAlign: 'center',margin: 0, color: '#ccc', lineHeight: 24, flexWrap: 'wrap'}}>
                                                    {"Joined"}{" "}{dayjs(this.props.userData.credentials.createdAt).format(`MMM YYYY`)}
                                                </Paragraph>
                                            </View>
                                           
                                        </View>
                                        <Modal visible={this.state.modal}  transparent={true} >
                                            <View  style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems:'center', }}>
                                                <View  style={{
                                                    width: width * 0.9, 
                                                    height: height *0.6,  
                                                    backgroundColor: "#fff", 
                                                    borderBottomLeftRadius: 30,
                                                    borderTopRightRadius: 30,  
                                                    borderTopLeftRadius: 30,
                                                    borderBottomRightRadius: 30,}}>
                                                    <View>
                                                        <View style={{alignItems: 'center', margin: 15}}>
                                                            <Text>Edit Profile here</Text>
                                                        </View>
                                                        
                                                                
                                                        <Text style={{
                                                            paddingHorizontal: 15 ,
                                                            color: '#05375a',
                                                            marginTop: 15,
                                                            fontSize: 18}}>Tell us something about yourself</Text>
                                                            <View style={{
                                                                            flexDirection: 'row',
                                                                            marginTop: 10,
                                                                            borderBottomWidth: 1,
                                                                            borderBottomColor: '#f2f2f2',
                                                                            paddingBottom: 5}}>             
                                                                
                                                                <TextInput 
                                                                defaultValue={this.state.bio}
                                                                placeholder="Bio" 
                                                                style={{
                                                                    flex: 1,
                                                                        marginTop: Platform.OS === 'ios' ? 0 : -12,
                                                                        paddingLeft: 15,
                                                                        color: '#05375a'}}
                                                                autoCapitalize="none"
                                                                onChangeText={(val)=> this.textInputChange(val, 'modalBio')}
                                                                ></TextInput>
                                        
                                                                </View>

                                                                <Text style={{
                                                            paddingHorizontal: 15 ,
                                                            color: '#05375a',
                                                            fontSize: 18}}>Location</Text>
                                                            <View style={{
                                                                            flexDirection: 'row',
                                                                            marginTop: 10,
                                                                            borderBottomWidth: 1,
                                                                            borderBottomColor: '#f2f2f2',
                                                                            paddingBottom: 5}}> 

                                                                 <MyIcon name="add-location" size={20} style={{marginLeft: 15}}></MyIcon>
                                                                <TextInput
                                                                defaultValue={this.state.location} 
                                                                placeholder="Location" 
                                                                style={{
                                                                    flex: 1,
                                                                        marginTop: Platform.OS === 'ios' ? 0 : -12,
                                                                        paddingLeft: 15,
                                                                        color: '#05375a'}}
                                                                autoCapitalize="none"
                                                                onChangeText={(val)=> this.textInputChange(val, 'modalLocation')}
                                                                ></TextInput>
                                        
                                                             </View>

                                                             
                                                             <Text style={{
                                                            paddingHorizontal: 15 ,
                                                            color: '#05375a',
                                                            fontSize: 18}}>Website</Text>
                                                            <View style={{
                                                                            flexDirection: 'row',
                                                                            marginTop: 10,
                                                                            borderBottomWidth: 1,
                                                                            borderBottomColor: '#f2f2f2',
                                                                            paddingBottom: 5}}>      

                                                                 <MyIcon2 name="paperclip" style={{marginLeft: 15}} size={20} ></MyIcon2>                  
                                                                
                                                                <TextInput 
                                                                defaultValue={this.state.website}
                                                                placeholder="Website" 
                                                                style={{
                                                                    flex: 1,
                                                                        marginTop: Platform.OS === 'ios' ? 0 : -12,
                                                                        paddingLeft: 15,
                                                                        color: '#05375a'}}
                                                                autoCapitalize="none"
                                                                onChangeText={(val)=> this.textInputChange(val, 'modalWebsite')}
                                                                ></TextInput>
                                        
                                                             </View>

                                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 15}}>
                                                                    {
                                                                        
                                                                    <TouchableOpacity disabled={this.props.loading} style={{ 
                                                                        width: width * 0.4,
                                                                        height: 50,
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        borderRadius: 10,}}
                                                                    onPress={()=>{this.handleSubmit()}}
                                                                    >
                                                                        <LinearGradient
                                                                            colors={["rgba(90, 93, 165, 1)","rgba(0, 0, 0, .7)"]}
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
                                                                            }]}> Save</Text>
                                                                        </LinearGradient>
                                                                    </TouchableOpacity>
                                                                    }
                                                                </View>
                                                                <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
                                                                    <TouchableOpacity onPress={()=>{this.setState({
                                                                        modal: false,  
                                                                        modalBio: "",
                                                                        modalOccupation: ""})}}>
                                                                        <Text style={{color: "rgba(90, 93, 165, 1)"}}>Cancel</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                    </View>   
                                                </View>

                                            </View>
                                        </Modal>
                            
                                    </Fragment>
                                    )
                                }
                            </ProductConsumer>
              
































      
        )
    }
}


