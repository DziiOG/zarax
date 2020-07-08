import React, { Component, Fragment } from "react";
import { Text, View, TouchableOpacity, Dimensions, Modal } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Right,
} from "native-base";
import { Avatar } from "react-native-paper";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MyIcon from "react-native-vector-icons/MaterialIcons";
import MyIcon2 from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import LottieView from "lottie-react-native";
import Comment from "./Comments/Comment";
import PostComment from "./PostComment/PostComment";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export class ZaraxDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FBIToken: "",
      userHandle: "",
      userHandle2: ""
    };
  }

  componentDidMount() {
    this.setState({
        FBIToken: this.props.FBIToken,
       
    })


  }


  sendToProfile = () => {
    // this.props.navigation.navigate("User")
   // console.log(this.props.azarax)
   // console.log(this.props.userData.credentials)

    if(this.props.userData.credentials.handle === this.props.azarax.userHandle){
        //console.log(userHandle + userHandle2)
     this.props.navigation.navigate("Profile")
         }          else{
     const header = {
         headers: {
           Authorization: this.state.FBIToken,
         }
       };

      // console.log(userHandle + userHandle2)
     this.props.getThisUserScreams(this.props.azarax.userHandle, header)
     this.props.navigation.navigate("User")
 }
}
     

  likedZarax = () => {
    if (
      this.props.userData.likes &&
      this.props.userData.likes.find(
        (like) => like.screamId === this.props.azarax.screamId
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  likeZarax = () => {
    const header = {
      headers: {
        Authorization: this.state.FBIToken,
      },
    };

    this.props.likeScream(this.props.azarax.screamId, header);
  };

  unlikeZarax = () => {
    const header = {
      headers: {
        Authorization: this.state.FBIToken,
      },
    };

    this.props.unlikeScream(this.props.azarax.screamId, header);
  };

  


  render() {
    dayjs.extend(relativeTime);
    const {
      body,
      commentCount,
      comments,
      createdAt,
      likeCount,
      screamId,
      userHandle,
      userImage,
    } = this.props.azarax;
   // console.log(comments + "THIS FROM COMMENTS")
    return (
        <Fragment>

            <Container>
                <Fragment>
                {this.props.uiLoading == false && this.props.screamId === screamId ? (
                    this.props.azarax ? (
                    <Content>
                        <Card>
                        <CardItem
                            style={{
                            borderBottomColor: "#fff",
                            flexDirection: "column",
                            }}
                            button
                            avatar
                        >
                            <View
                            style={{
                                flexDirection: "row",
                            }}
                            >
                                <Left>
                                <TouchableOpacity
                                onPress={()=>{
                                    this.sendToProfile()
                                }}
                                >

                                        <Avatar.Image source={{ uri: userImage }} />
                                </TouchableOpacity>
                                        <Body>
                                        <Text>{userHandle}</Text>
                                        </Body>
                                    </Left>
                            </View>

                            <View
                            style={{
                                flexDirection: "column",
                                width: width * 0.6,
                            }}
                            >
                            <View
                                style={{
                                flexDirection: "column",
                                width: width * 0.68,
                                }}
                                onPress={() => {}}
                            >
                                <Body>
                                <Text
                                    style={{
                                    marginBottom: 10,
                                    fontSize: 18,
                                    }}
                                    note
                                >
                                    {body}
                                </Text>
                                </Body>
                            </View>

                            <View
                                style={{
                                flexDirection: "row",
                                }}
                            >
                                <TouchableOpacity
                                onPress={() => {
                                    this.likedZarax() == false
                                    ? this.likeZarax()
                                    : this.unlikeZarax();
                                }}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                                >
                                <MyIcon
                                    name={
                                    this.likedZarax() == false
                                        ? "favorite-border"
                                        : "favorite"
                                    }
                                    color={
                                    this.likedZarax() == false ? "#d2d2d2" : "#ff0000"
                                    }
                                    size={25}
                                ></MyIcon>
                                <Text
                                    style={{
                                    fontSize: 15,
                                    color:
                                        this.likedZarax() == false
                                        ? "#d2d2d2"
                                        : "#ff0000",
                                    }}
                                    note
                                >
                                    {likeCount === 0 ? "" : likeCount}
                                </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                onPress={() => {
                                    this.props.openModal("comment")
                                }}
                                style={{
                                    alignItems: "center",
                                    flexDirection: "row",
                                    paddingHorizontal: width * 0.2,
                                }}
                                >
                                <MyIcon2
                                    name={"chat-outline"}
                                    color="#d2d2d2"
                                    size={25}
                                ></MyIcon2>
                                <Text
                                    style={{
                                    fontSize: 13,
                                    color: "#d2d2d2",
                                    }}
                                    note
                                >
                                    {commentCount === 0 ? "" : commentCount}
                                </Text>
                                </TouchableOpacity>
                               
                            </View>
                            </View>
                            <View
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 20,
                            }}
                            >
                            <Text
                                style={{
                                fontSize: 9,
                                }}
                                note
                            >
                                {dayjs(createdAt).format(`h:mm a, MMMM DD YYYY`)}
                            </Text>
                            </View>
                        </CardItem>
                        </Card>

                        {this.props.comments.length == 0  ? (
                        this.props.uiLoading == false ? 
                        null
                        :
                        <View
                            style={{
                            justifyContent: "center",
                            position: "relative",
                            left: width * 0.45,
                            flex: 1,
                            height: 50,
                            width: 50,
                            alignItems: "center",
                            }}
                        >
                            <LottieView
                            source={require("../../../assets/still.json")}
                            autoPlay
                            loop
                            />

                        </View>
                        ) : (
                        this.props.comments.map((comment) => {
                            const { body, userHandle, createdAt, userImage } = comment;
                            return (
                            <Comment
                                key={createdAt}
                                uiLoading={this.props.uiLoading}
                                navigation={this.props.navigation}
                                body={body}
                                userHandle={userHandle}
                                createdAt={createdAt}
                                userImage={userImage}
                                FBIToken={this.props.FBIToken}
                                userData={this.props.userData}
                                getThisUserScreams={this.props.getThisUserScreams}
                            ></Comment>
                            );
                        })
                        )}
                    </Content>
                    ) : (
                    <View
                        style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                        }}
                    >
                        <Text>Ah! something went wrong</Text>
                    </View>
                    )
                ) : 
                this.props.uiLoading == false ?
                <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    }}
                >
                    <Text>Appears to be trouble fetching Zarax. Check internet connection and try again</Text>
                </View> :
                (
                    <View
                    style={{
                        justifyContent: "center",
                        alignContent: "center",
                        flex: 1,
                        height: 50,
                        width: 50,
                        position: "absolute",
                        right: width * 0.43,
                    }}
                    >
                    <LottieView
                        source={require("../../../assets/still.json")}
                        autoPlay
                        loop
                    />
                    </View>
                )}
                </Fragment>
            </Container>
            <PostComment  screamId={this.props.screamId}  Modal={this.props.commentModal} FBIToken={this.props.FBIToken}  loading={this.props.loading} postComment={this.props.postComment} closeModal={this.props.closeModal} navigation={this.props.navigation} userData={this.props.userData} getScream={this.props.getScream}></PostComment>
        </Fragment>
    );
  }
}

export default ZaraxDialog;
