import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from "../screens/Landing";
// import GuidelineAppStack from "../../guidelines/utils/navigations/navigation";
import GuidelineAppStack from "../../guidelines";
import ReportApp from "../../report";
import MalariaTerminology from "../screens/MalariaTerminology";
import {navigationRef} from './navigationService';
// const LandingStack = createStackNavigator({
//   Landing: {
//     screen: Landing,
//     options: () => ({
//       header: false,
//       headerStyle: {
//         elevation: 0,
//         height: 0, shadowOpacity: 0, shadowColor: 'transparent', borderBottomColor: 'transparent', borderBottomWidth: 0
//       }
//     })
//   }
// });

const Stack = createNativeStackNavigator();
function AppContainer() {

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName='Landing' screenOptions={() => ({
          headerShown: false,
          headerStyle: {
            elevation: 0,
            height: 0, shadowOpacity: 0, shadowColor: 'transparent', borderBottomColor: 'transparent', borderBottomWidth: 0
          }
        })}>
        <Stack.Screen name="Landing" component={Landing}  />
        <Stack.Screen name="GuidelineApp" component={GuidelineAppStack}/>
        <Stack.Screen name="reportApp" component={ReportApp}  />
        <Stack.Screen name="MalariaTerminology" component={MalariaTerminology}/>
      </Stack.Navigator>
    </NavigationContainer>

  );

}
// Now AppContainer is the main component for React to render
export default AppContainer;