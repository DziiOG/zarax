import 'react-native-gesture-handler'
import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Root from './src/main';
import axios from 'axios';




export default function App() {
  return (
    
    <View style={styles.container}>
      <StatusBar hidden={true}></StatusBar>
        <Root {...this.props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

axios.defaults.baseURL = "https://europe-west1-zarax-220f5.cloudfunctions.net/api";