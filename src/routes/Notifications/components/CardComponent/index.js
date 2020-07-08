import React, { Component } from 'react'
import { Card, CardItem} from 'native-base'
import { Text, Image, Dimensions } from 'react-native'
const width = Dimensions.get('window').width

export default class CardComponent extends Component {
    render() {
        return (
            <Card style={{margin: 95}}>
               <CardItem style={{height: 10}}>
                    <Text style={{fontSize: 13}}>SpongeBob's girl just liked your picture</Text>
                </CardItem>
                    <CardItem cardBody>
                        <Image source={require('../../../../assets/flo.jpg')} style={{
                            height: 100, width: width, flex: 1, overflow: 'hidden'
                        }}></Image>
                </CardItem>
            </Card>
        )
    }
}
