import React, { Component, Fragment } from 'react';
import { View, Dimensions, TouchableOpacity, RefreshControl} from 'react-native';
import axios from 'axios';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon } from 'native-base';
import { ActivityIndicator } from 'react-native-paper';
import ZaraxComponent from './Zarax/zarax';
import { ProductConsumer } from '../../../context';
import LottieView from 'lottie-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostZarax from './PostZarax/PostZarax';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  componentDidMount(){
    const header = {
      headers: {
        Authorization: this.props.FBIToken,
      }
    };
   // console.log(this.props)
  this.props.getScreams();
  //this.props.getUserData(header);
 // this.props.getThisUserScreams("user", header)

  

  }

  render() {
    
    return (
      <Fragment>

      <Container>
     
    {
      (this.props.loading == false) ?
      <Content on >
        <List   >
          {
            (this.props.zarax.length > 0) ?
            (
              this.props.zarax.map((zarax)=> (
               <ZaraxComponent key={zarax.screamId} getThisUserScreams={this.props.getThisUserScreams} uiLoading={this.props.uiLoading} getScream={this.props.getScream} navigation={this.props.navigation} deleteScream={this.props.deleteScream} zarax={zarax} likeScream={this.props.likeScream} unlikeScream={this.props.unlikeScream} FBIToken={this.props.FBIToken} userData={this.props.userData}></ZaraxComponent>
            ))
            ) : <View
            style={{
              justifyContent: "center",
              flex: 1,
              alignContent: "center"
            }}>
              <Text>Something went wrong</Text>
            </View>
            
          }
        </List>
      </Content> : 
      <Fragment>
          <Content  >
        <List   >
          <ListItem>
          <View style={{
            justifyContent: 'center',
            alignContent: 'center',
            flex: 1,
            height: 50,
            width: 50,
            position: "absolute",
            right: width * 0.43
          }}>
            <LottieView source={require('../../../assets/still.json')} autoPlay loop />
          </View>

          </ListItem>
          {
            (this.props.zarax.length > 0) ?
            (
              this.props.zarax.map((zarax)=> (
               <ZaraxComponent key={zarax.screamId} getThisUserScreams={this.props.getThisUserScreams} uiLoading={this.props.uiLoading} getScream={this.props.getScream} navigation={this.props.navigation} deleteScream={this.props.deleteScream} zarax={zarax} likeScream={this.props.likeScream} unlikeScream={this.props.unlikeScream} FBIToken={this.props.FBIToken} userData={this.props.userData}></ZaraxComponent>
            ))
            ) : <View
            style={{
              justifyContent: "center",
              flex: 1,
              alignContent: "center"
            }}>
              <Text>Something went wrong</Text>
            </View>
            
          }
        </List>
      </Content>
      </Fragment>
            }
              <TouchableOpacity onPress={()=> {
                                      this.props.openModal("zarax")
                                    }} style={{
                                        backgroundColor: '#5cccee',
                                        position: "absolute",
                                        right: 15,
                                        bottom: 15,
                                        height: 43,
                                        width: 43,
                                        borderRadius: 43,
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        shadowColor: '#ff0000',
                                        shadowRadius: 60,
                                        shadowOffset: {
                                          height: 60,
                                          width: 60
                                        }
                                    }}>
                                        <MaterialCommunityIcons name="plus" size={20} style={{
                                            color: '#fff'
                                        }}></MaterialCommunityIcons>
              </TouchableOpacity> 
    </Container>
    <PostZarax Modal={this.props.zaraxModal} FBIToken={this.props.FBIToken}  loading={this.props.loading} postScream={this.props.postScream} closeModal={this.props.closeModal} navigation={this.props.navigation} userData={this.props.userData} getScreams={this.props.getScreams}></PostZarax>
      </Fragment>
    );
  }
}

export default Home;
