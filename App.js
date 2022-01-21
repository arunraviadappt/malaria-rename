/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
 import 'react-native-gesture-handler';
 import React, { Component } from 'react';
 import { StyleSheet, View, Dimensions, StatusBar } from 'react-native';
 import AppContainer from './src/toolkit/navigations/navigation';
 import SplashScreen from 'react-native-splash-screen';
 import upgradeDialogBox from './upgrade';
 
 const { width, height } = Dimensions.get('window');
 
 export default class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
       showMessage: false
     }
   }
   componentDidMount() {
     SplashScreen.hide();
     upgradeDialogBox();
   }
 
   render() {
     return (
       <View style={styles.container}>
         <View style={{ flex: 1 }}>
           <StatusBar backgroundColor="#FFF" barStyle="dark-content" /> 
           <AppContainer/>
         </View>
       </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1
   },
   statusBar:{
     width: width,
     paddingVertical: 5,
     position: 'absolute',
     bottom: 50
   }
 });