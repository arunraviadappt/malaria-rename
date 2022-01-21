

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, { Component } from 'react';
 import { connect } from 'react-redux';
 import { StyleSheet, View, Text, Dimensions, StatusBar } from 'react-native';
 import AppContainer from './navigation/navigation';
 import creator from './redux/actionCreators';
 import {ifIphoneX} from 'react-native-iphone-x-helper';
 import FooterContainer from './components/Footer';
 import Theme from '../report/styles/Theme'
 const { width } = Dimensions.get('window');

 class App extends Component {
   constructor(props) {
     super(props);
     this.state = {
       showMessage: false
     }
   }
 
   componentDidMount() {
     this.props.startSync();
   }
 
   render() {
     return (
       <View style={styles.container}>
         <View style={{ flex: 1}}>
           <StatusBar backgroundColor={Theme.color.appPrimaryColor} barStyle="dark-content" />
           <AppContainer/>
           {(this.props.showSyncStatus) && (
             <View style={[styles.statusBar, { backgroundColor: this.props.statusColor }]}>
               <Text style={{ color: '#fff', textAlign: 'center' }}>{this.props.syncStatus}</Text>
             </View>
           )}
           <FooterContainer />
         </View>
       </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1
   },
   statusBar: {
     width: width,
     paddingVertical: 5,
     position: 'absolute',
     bottom: 50,
    // ...ifIphoneX({bottom: 50})
   }
 });
 
 const mapStateToProps = (state) => {
   return {
     syncStatus: state.appState.syncStatus,
     showSyncStatus: state.appState.showSyncStatus,
     statusColor: state.appState.color
   }
 }
 
 const mapDispatchToProps = (dispatch) => {
   return {
     startSync: () => dispatch(creator.startSync())
   }
 }
 export default connect(mapStateToProps, mapDispatchToProps)(App);
 
 