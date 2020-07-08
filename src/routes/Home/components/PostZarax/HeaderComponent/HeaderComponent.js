import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import {Header, Left, Right} from 'native-base';
import {
    Avatar,
} from 'react-native-paper';
import LottieView from 'lottie-react-native';

export default function HeaderComponent({ zarax, closeModal, postScream, loading, FBIToken, newZarax}) {

    const header = {
        headers: {
          Authorization: FBIToken,
        }
      };

    return (
        <Header style={{
            backgroundColor: '#fff',
            height: 50
        }}>
            <Left
            style={{
                paddingHorizontal: 15
            }}>
            <TouchableOpacity
                onPress={()=>{
                  closeModal("zarax")
                }}
                >
                        <Text style={{
                            color: "#5cccee"
                        }}>Cancel</Text>
                </TouchableOpacity>
            </Left>
            <Right>
                {
                    
                    (loading == false) ?
                <TouchableOpacity
                onPress={()=>{
                    postScream(newZarax, header)
                }}
                style={{
                    backgroundColor: "#5cccee",
                    width: 60,
                    height: 30,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: 'center'
                }}
                disabled={(zarax === "")? true : false}
                >
                    <Text style={{
                        color: "#fff"
                    }}>Zarax</Text>
                </TouchableOpacity> :
                <View
                style={{
                    
                    width: 60,
                    height: 30,
                    
                    justifyContent: "center",
                    alignItems: 'center'
                }}
                >
                <LottieView source={require('../../../../../assets/loading.json')} autoPlay loop />
        </View>

                }
            </Right>
        </Header>
    )
}

/**
 * <View>
                            <LottieView source={require('../../../../../assets/loading.json')} autoPlay loop />
                    </View> :
 */