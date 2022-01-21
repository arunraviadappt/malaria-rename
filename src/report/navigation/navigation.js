import React from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import MalariaReportHome from '../screens/MalariaReportHome';
import QuickStats from '../screens/quickstats/QuickStats';
import Cases from '../screens/quickstats/Cases';
import Death from '../screens/quickstats/Death';
import Reduction from '../screens/quickstats/Reduction';
import Incidence from '../screens/quickstats/Incidence';
import Mortality from '../screens/quickstats/Mortality';
import Ionicon from 'react-native-vector-icons/Ionicons';
import QuickStatsDetail from '../screens/quickstats/QuickStatsDetail';
import About from '../screens/about/About'
import Links from '../screens/links/Links'
import Abbreviations from '../screens/abbreviations/Abbreviations'
import Disclaimer from '../screens/disclaimer/Disclaimer'
import Initiatives from '../screens/initiatives/Initiatives';
import InitiativeCountriesList from '../screens/initiatives/InitiativeCountriesList';
import InitiativeIndicator from '../screens/initiatives/InitiativeIndicator';
import RegionList from '../screens/regions/RegionList';
import RegionCountriesList from '../screens/regions/Countries';
import RegionsIndicator from "../screens/regions/RegionsIndicator";
import RegionBarChart from "../screens/regions/RegionBarChart";
import RegionCandelStick from "../screens/regions/RegionCandelStick";
import RegionLineChart from "../screens/regions/RegionLineChart";
import RegionStackedBar from "../screens/regions/RegionStackedBar";
import CompareCountries from '../screens/countries/CompareCountries';
import CompareRegionIndicator from "../screens/regions/CompareIndicators";
import IndicatorDataElement from "../screens/indicators/IndicatorDataElement";
import NewsDetails from '../screens/news/NewsDetails';
import IndicatorDataElementCountriesList from "../screens/indicators/IndicatorDataElementCountriesList";

//import Countries from '../screens/countries/CountriesList';
import Theme from '../styles/Theme';
import BarChart from '../components/common/chart/BarChart';
import StackedBar from '../components/common/chart/StackedBar';
import CandelStick from '../components/common/chart/CandelStick';
import LineChart from '../components/common/chart/LineChart';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DeviceInfo from 'react-native-device-info';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import MapComponent from "../components/common/map";

import { menu } from '../screens/menu.json';
import CompareInitiativeCountries from '../screens/countries/CompareInitiativeCountries';
import CompareInitiativeIndicator from '../screens/initiatives/CompareInitiativeIndicator';
import Compare from '../screens/compare';
import { NavigationContainer } from '@react-navigation/native';
import navigationService, { navigatorRef } from '../utils/navigations/navigationService';



const headerLeft = (navigation) => {
  return (
    <TouchableOpacity onPress={() => goBack(navigation)} style={{ height: 50, width: 60, alignItems: 'center', justifyContent: 'center' }}>
      <Ionicon name="ios-arrow-back" size={38} color="#fff" />
    </TouchableOpacity>
  )
}
const headerRight = (navigation) => {
  return (
    <View style={{ width: 60, height: 53, top: -3, backgroundColor: 'transparent' }} />
  )
}

const hamburgerMenuItem = (navigation) => {
  return (
    <View style={{ flex: 1 }}>
    <View style={{ ...ifIphoneX({height:105}, {height: 64}),...ifIphoneX({paddingTop: 48}, (Platform.OS === 'android') ? null : {paddingTop: 13}),top: 0,width: width - 50,backgroundColor: Theme.color.appPrimaryColor,borderBottomWidth: 1,borderBottomColor: '#ddd',flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => navigationService.drawerClose()}
        style={{ height: 40,  width: 60}}>
        <Ionicon style={{paddingLeft: 15,paddingTop: 10,height: 40,width: 60,justifyContent: 'center', alignItems:'center' }} name="ios-arrow-back" size={38} color="#fff" />
      </TouchableOpacity>
      <View style={{ flex: 1,paddingTop: 0,alignItems: 'center',justifyContent: 'center',}}>
        <Text style={{ fontSize: 18, fontFamily: Theme.customFont.fontSemiBold,alignItems: 'center', textAlign: 'center', color: '#fff', paddingTop: 5 }}>Quick Menu</Text>
      </View>
      <View style={{  width: width * .15,
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'center'}} />
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        {menu.map((data, i) => {
          return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigationService.navigate(data.menulabel)} key={`drawer-menu-item-container-${data.name}`} style={{ flexDirection: 'row', borderBottomColor: Theme.customColor.itemSeparatorColor, borderBottomWidth: StyleSheet.hairlineWidth, paddingLeft: 10, paddingRight: 15 }}>
              {/* <View style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: StyleSheet.hairlineWidth }}>
                <Text style={{ fontSize: 14, fontFamily: Theme.customFont.fontRegular, color: '#000' }}>{data.name}</Text>
              </View> */}
              <View style={{ justifyContent: 'center', width: 30, }}>
                <SimpleLineIcons name="layers" size={18} color={Theme.color.ping} />
              </View>
              <View style={{ paddingTop: 15, paddingBottom: 15, }}>
                <Text style={{ fontSize: 16, fontFamily: Theme.customFont.fontRegular, color: Theme.customColor.textColor }}>{data.name}</Text>
              </View>
            </TouchableOpacity>
          )
        }
        )}
        <View style={{ flexDirection: 'row', borderBottomColor: Theme.customColor.itemSeparatorColor, borderBottomWidth: StyleSheet.hairlineWidth, paddingLeft: 10, paddingRight: 15 }}>
          <View style={{ justifyContent: 'center', width: 30, }}>
            <SimpleLineIcons name="info" size={18} color={Theme.color.ping} />
          </View>
          <View style={{ paddingTop: 15, paddingBottom: 15, }}>
            <Text style={{ fontSize: 16, fontFamily: Theme.customFont.fontRegular, color: Theme.customColor.textColor }}>Version: {DeviceInfo.getVersion()} <Text style={{fontSize:13}}>({DeviceInfo.getBuildNumber()})</Text></Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const goBack = (navigation) => {
  if (navigation.state.routeName !== 'Compare' && navigation.state.routeName != 'MalariaReportHome') {
    navigation.goBack(null);
    Keyboard.dismiss()
  }
  if ((navigation.state.routeName === 'Compare') || (navigation.state.routeName === 'QuickStats')) {
    navigation.replace('MalariaReportHome')
    Keyboard.dismiss()
  }
}

const Stack = createNativeStackNavigator();
 function HomeNavigator() {
  return (
    
      <Stack.Navigator
        defaultScreenOptions={
          ({ navigation }) => ({
            headerStyle: {
              backgroundColor: Theme.color.appPrimaryColor,
              height: 50,
              marginTop: 0
            },
            headerLayoutPreset: 'center',
            headerTintColor: 'red',
            headerTitleStyle: {
              flex: 1,
              textAlign: 'center',
              fontSize: 18,
              color: '#fff',
              fontFamily: Theme.customFont.fontSemiBold
            },
            headerBackTitle: null,
            headerLeft: (headerLeft(navigation)),
            headerRight: (headerRight(navigation))
          })
        }
          
         >
        <Stack.Screen
          name="MalariaReportHome"
          component={MalariaReportHome}
          options= { {
            headerMode: 'none',
            headerShown:false,
            headerStyle: {
                        backgroundColor: '#fff',
                        borderBottomColor: '#1555AA',
                        borderBottomWidth: 0
            }
          }}/>
        <Stack.Screen
          name="QuickStats"
          component={QuickStats}
           />
          <Stack.Screen
          name="Cases"
          component={Cases} />
           <Stack.Screen
          name="Death"
          component={Death} />
        <Stack.Screen
          name="Reduction"
          component={Reduction} />
          <Stack.Screen
          name="Incidence"
          component={Incidence} />
        <Stack.Screen
          name="Mortality"
          component={Mortality} />
          <Stack.Screen
          name="QuickStatsDetail"
          component={QuickStatsDetail} />
        <Stack.Screen
          name="Regions"
          component={RegionList} />
        <Stack.Screen
          name="RegionCountriesList"
          component={RegionCountriesList} />
        <Stack.Screen
          name="RegionsIndicator"
          component={RegionsIndicator} />
        <Stack.Screen
          name="Initiatives"
          component={Initiatives} />
        <Stack.Screen
          name="InitiativeCountriesList"
          component={InitiativeCountriesList} />
        <Stack.Screen
          name="InitiativeIndicator"
          component={InitiativeIndicator} />
        <Stack.Screen
          name="About"
          component={About} />
        <Stack.Screen
          name="Links"
          component={Links} />
        <Stack.Screen
          name="Abbreviations"
          component={Abbreviations} />
        <Stack.Screen
          name="Disclaimer"
          component={Disclaimer} />
        <Stack.Screen
          name="RegionBarChart"
          component={RegionBarChart} />
        <Stack.Screen
          name="RegionCandelStick"
          component={RegionCandelStick} />
        <Stack.Screen
          name="RegionLineChart"
          component={RegionLineChart} />
        <Stack.Screen
          name="RegionStackedBar"
          component={RegionStackedBar} />
          <Stack.Screen
          name="CompareCountries"
          component={CompareCountries} />
        <Stack.Screen
          name="CompareRegionIndicator"
          component={CompareRegionIndicator} />
        <Stack.Screen
          name="IndicatorDataElement"
          component={IndicatorDataElement} />
        <Stack.Screen
          name="IndicatorDataElementCountriesList"
          component={IndicatorDataElementCountriesList} />
        <Stack.Screen
          name="BarChart"
          component={BarChart} />
        <Stack.Screen
          name="StackedBar"
          component={StackedBar} />
        <Stack.Screen
          name="CandelStick"
          component={CandelStick} />
        <Stack.Screen
          name="LineChart"
          component={LineChart} />
        <Stack.Screen
          name="NewsDetails"
          component={NewsDetails} />
        <Stack.Screen
          name="Map"
          component={MapComponent} />
        <Stack.Screen
          name="CompareInitiativeCountries"
          component={CompareInitiativeCountries} />
        <Stack.Screen
          name="CompareInitiativeIndicator"
          component={CompareInitiativeIndicator} />
        <Stack.Screen
          name="Compare"
          component={Compare} />
        
      </Stack.Navigator>
  
  );
}


const Drawer = createDrawerNavigator();
export default function AppContainer() {
  return (
      <NavigationContainer ref={navigatorRef} independent={true} >
      <Drawer.Navigator drawerContent={navigation=>hamburgerMenuItem(navigation)} 
                        screenOptions={{headerShown:false,
                                        drawerWidth: width - 50,
                                        useNativeAnimations: true,
                                        drawerType: 'back',
                                        backgroundColor: 'red',
                                        overlayColor: 'transparent',
                                        shadowColor: '#000000',
                                        shadowOpacity: 0.5}}>
        <Drawer.Screen name="DrawerMenu" component={HomeNavigator} />
      </Drawer.Navigator>
      </NavigationContainer>

  );
}
