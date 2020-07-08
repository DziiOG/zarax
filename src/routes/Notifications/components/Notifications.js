import React, { Component, Fragment } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Container, Content,  Body,  Card, CardItem} from 'native-base';
import { ProductConsumer } from '../../../context';
import CardComponent from './CardComponent';

export default class Notifications extends Component {
    render() {


        

        return ( 

            


            <ProductConsumer>
                {
                    (value)=> (

                    <Container style={{backgroundColor: 'white'}}>
                            
                    </Container>
                    )
                }
            </ProductConsumer>
        )
    }
}
