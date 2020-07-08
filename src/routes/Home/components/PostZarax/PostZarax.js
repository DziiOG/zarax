import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, Modal, Dimensions } from 'react-native'

import {  Left, Container, List, ListItem, Thumbnail } from 'native-base'
import {
    Avatar,
    
} from 'react-native-paper';
import HeaderComponent from './HeaderComponent/HeaderComponent';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export class PostZarax extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zarax:"",
            newZarax: {}
        };
      }

      handleTextChange = (val) => {
       

        this.setState({
            zarax: val
        })

       
      }

    render() {
        return (
            <Modal visible={this.props.Modal} animated={true} animationType="slide"  contentContainerStyle={{
                backgroundColor: "#fff"
            }}>
                <View>
                    <HeaderComponent zarax={this.state.zarax} newZarax={{
                        body: this.state.zarax
                    }} FBIToken={this.props.FBIToken} loading={this.props.loading} postScream={this.props.postScream} closeModal={this.props.closeModal} ></HeaderComponent>
                <List>

                        <ListItem style={{
                            borderBottomColor: '#fff',
                            flexDirection: "row"
                            
                        }} button avatar>
                            <Left>
                                <Avatar.Image  size={30} source={{ uri: this.props.userData.credentials.imageUrl }} />
                            </Left>
                     
                        <View style={{
                            position: "absolute",
                            padding: 30,
                            paddingBottom: 3,
                            
                            top: 15,
                            left:50
                        }}>

                            <TextInput style={{
                                flexWrap: "wrap",
                                position: "absolute",
                                top: -40,
                                right: 30,
                                width: width * 0.7,
                                position: "relative",
                                paddingHorizontal: 5,
                               
                                justifyContent: "flex-start"
                                

                                
                                
                                
                            }}
                            placeholder="What's up?"
                            autoFocus={true} maxLength={280}
                            onChangeText={(val)=> {
                                    //console.log(val.length)
                                    this.handleTextChange(val);
                            }}

                            numberOfLines={1}
                            textAlignVertical="auto"
                            multiline={true}
                            ></TextInput>
                        </View>
                        

                        
                    </ListItem>
                </List>
                
                </View> 
            </Modal>
        )
    }
}

export default PostZarax
