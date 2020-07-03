import 'react-native-gesture-handler'
import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Root from './src/main';




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