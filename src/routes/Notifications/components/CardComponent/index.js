import React, { Component } from "react";
import { Card, CardItem, List, ListItem } from "native-base";
import { Text, Image, Dimensions, TouchableOpacity } from "react-native";
import MyIcon from "react-native-vector-icons/MaterialIcons";
import MyIcon2 from "react-native-vector-icons/MaterialCommunityIcons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
dayjs.extend(relativeTime);
const width = Dimensions.get("window").width;

export default class CardComponent extends Component {
  componentDidMount() {
    this.interval = this.handleOpened();
  }

  componentWillUnmount() {
      clearTimeout(this.interval)
  }

  handleOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId);

    console.log(unreadNotificationsIds);

    const header = {
      headers: {
        Authorization: this.props.FBIToken,
      },
    };

   
    this.props.markNotificationsRead(unreadNotificationsIds, header)
  };

  render() {
    const {
      notificationId,
      screamId,
      sender,
      type,
      createdAt,
      read,
    } = this.props.not;

    return (
      <TouchableOpacity
        style={{
          backgroundColor: read === false ? "#5cccee" : null,
        }}
        onPress={() => {
          const header = {
            headers: {
              Authorization: this.props.FBIToken,
            },
          };
          this.props.navigation.navigate("Zarax");
          this.props.getScream(screamId, header);
        }}
      >
        <List
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ListItem button avatar cardBody>
            {type == "like" ? (
              <MyIcon name="favorite" color={"#ff0000"} size={60}></MyIcon>
            ) : (
              <MyIcon2 name={"chat"} color="#000" size={18}></MyIcon2>
            )}
          </ListItem>
          <ListItem style={{}}>
            <Text style={{ fontSize: 13 }}>
              {sender}{" "}
              {type == "like" ? "liked your Zarax" : "commented on your Zarax"}{" "}
              {dayjs(createdAt).fromNow()}
            </Text>
          </ListItem>
        </List>
      </TouchableOpacity>
    );
  }
}
