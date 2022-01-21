/**
 * @format
 */
 import React from 'react';
 import { AppRegistry, View } from 'react-native';
// import { SafeAreaView } from 'react-navigation';
 import App from './App';
 import { name as appName } from './app.json';
 
 // console.disableYellowBox = true;
 const rootApp = () => {
   return (
     <View style={{ flex: 1, backgroundColor: '#fff' }}>
       <App />
     </View>
   )
 }
 AppRegistry.registerComponent(appName, () => rootApp);
 