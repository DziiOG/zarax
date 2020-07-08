import React, { Component, Fragment } from "react";
import { View , Dimensions} from "react-native";
import MyIcon from "react-native-vector-icons/MaterialIcons";
import MyIcon2 from "react-native-vector-icons/MaterialCommunityIcons";
import dayjs from "dayjs";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from "native-base";
import {
    Avatar,
    Paragraph
   
} from 'react-native-paper';
import ZaraxComponent from "../../Home/components/Zarax/zarax";
import ZaraxProfile from "./ZaraxProfile/ZaraxProfile";
import LottieView from 'lottie-react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export class UserProfile extends Component {
  render() {
    const {
      handle,
      email,
      bio,
      website,
      location,
      imageUrl,
      createdAt,
    } = this.props.userInfo;
    return (
      <Container>
        {this.props.uiLoading == false ? (
          <Fragment>
            <List>
              <ListItem avatar>
                <Left>
                  <Avatar.Image size={50} source={{ uri: imageUrl }} />
                </Left>
                <Body>
                  <View>
                    <Text>
                      {"@"}
                      {handle}
                    </Text>
                  </View>
                  <View>
                    <Text note>{email}</Text>
                  </View>
                  <View>
                    <Text note>{bio}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <MyIcon2
                      name="paperclip"
                      size={20}
                      style={{ marginRight: 5 }}
                    ></MyIcon2>
                    <Text note>{website}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <MyIcon
                      name="add-location"
                      size={20}
                      style={{ marginRight: 5 }}
                    ></MyIcon>
                    <Text note>{location}</Text>
                  </View>
                </Body>
                <Right
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <MyIcon2
                    name="calendar"
                    size={20}
                    style={{ marginRight: 5 }}
                  ></MyIcon2>
                  <Text note>
                    {" "}
                    {"Joined"} {dayjs(createdAt).format(`MMM YYYY`)}
                  </Text>
                </Right>
              </ListItem>
            </List>
            <Content>
              <List>
                {this.props.screams.length == 0 ? (
                  <View>
                    <Text>No Zarax found for this user</Text>
                  </View>
                ) : (
                  this.props.screams.map((zarax) => (
                    <ZaraxProfile
                      key={zarax.screamId}
                      getThisUserScreams={this.props.getThisUserScreams}
                      uiLoading={this.props.uiLoading}
                      getScream={this.props.getScream}
                      navigation={this.props.navigation}
                      deleteScream={this.props.deleteScream}
                      zarax={zarax}
                      likeScream={this.props.likeScream}
                      unlikeScream={this.props.unlikeScream}
                      FBIToken={this.props.FBIToken}
                      userData={this.props.userData}
                    ></ZaraxProfile>
                  ))
                )}
              </List>
            </Content>
          </Fragment>
        ) : (
          <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            flex: 1,
            height: 50,
            width: 50,
            position: "absolute",
            right: width * 0.43
          }}
          >
               <LottieView source={require('../../../assets/still.json')} autoPlay loop />
          </View>
        )}
      </Container>
    );
  }
}

export default UserProfile;
