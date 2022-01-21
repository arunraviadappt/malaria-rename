/**
 * @format
 */
 import React from 'react';
 import { SafeAreaView} from 'react-native';
 import { StyleSheet, View, Text, Dimensions } from 'react-native';
 
 import App from './app';
 import { Provider } from 'react-redux';
 import { PersistGate } from 'redux-persist/integration/react'
 import { store, persistor } from './redux/store';
 import Loader from "./components/common/Loader";
 var { width, height } = Dimensions.get('window');
 import LinearGradient from 'react-native-linear-gradient';
 
 // console.disableYellowBox = true;
 export default () => {
   return (
     <Provider store={store}>
       <PersistGate loading={<Loader/>} persistor={persistor}>
         <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#2ca3a8', '#2ca3a8','#fff', '#fff']} style={{flex: 1}}>
           <SafeAreaView style={{ flex: 1 }}>
               <App />
           </SafeAreaView>
         </LinearGradient>
       </PersistGate>
     </Provider>
   )
 }
 