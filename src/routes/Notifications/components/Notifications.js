import React, { Component, Fragment } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Container, Content,  Body,  Card, CardItem, List, ListItem} from 'native-base';
import { ProductConsumer } from '../../../context';
import CardComponent from './CardComponent';


export default class Notifications extends Component {
 
 
     
    render() {


 

        return ( 

            


            <ProductConsumer>
                {
                    (value)=> (

                    <Container style={{backgroundColor: 'white'}}>
                            <Content>
                                <List>
                                    {
                                        (this.props.notifications.length > 0) ?
                                        (
                                            this.props.notifications.map((not) => (
                                                <ListItem key={not.createdAt}>
                                                    <CardComponent  not={not} navigation={this.props.navigation} markNotificationsRead={this.props.markNotificationsRead} notifications={this.props.notifications} FBIToken={this.props.FBIToken} getScream={this.props.getScream}>

                                                    </CardComponent>
                                                </ListItem>
                                            ))
                                        ): <View
                                            style={{
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flex: 1
                                            }}
                                        >
                                            <Text>
                                                There are no notifications for you
                                            </Text>
                                        </View>
                                    }
                                </List>
                            </Content>
                    </Container>
                    )
                }
            </ProductConsumer>
        )
    }
}
