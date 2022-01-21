import React from 'react';
import { View, Text, Platform, Image, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
// import Landing from '../../screens/Landing';
import Home from '../../screens/Home';
// import MalariaPolicyGuidelinesHome from '../../screens/MalariaPolicyGuidelinesHome'
// import MalariaReportHome from '../../screens/MalariaReportHome'
import SquareMenu from '../../screens/SquareMenu';
import MenuList from '../../screens/MenuList';
const { width, height } = Dimensions.get('window');
import ExternalStyles from '../../styles/Basic';
import { navigateHelper } from './navigationHelper';
import HeaderTitle from '../../components/navBar';
import CarousalView from '../../screens/CarousalView';
import Favourites from '../../screens/Favourites';
import Search from '../../screens/Search';
import StoryViewImageZoom from '../../components/StoryView/StoryViewImageZoom';
import DrawerMenu from '../../screens/DrawerMenu';
import Tags from '../../screens/Tags';
import Theme from '../../styles/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import App from '../../app';
import MalariaPolicyGuidelinesHome from '../../screens/MalariaPolicyGuidelinesHome';
// import QuickStats from '../../screens/MalariaReportAppScreen/quickstats/QuickStats';
// import Cases from '../../screens/MalariaReportAppScreen/quickstats/Cases'
// import Death from '../../screens/MalariaReportAppScreen/quickstats/Death'
// import Reduction from '../../screens/MalariaReportAppScreen/quickstats/Reduction'
// import Incidence from '../../screens/MalariaReportAppScreen/quickstats/Incidence'
// import Mortality from '../../screens/MalariaReportAppScreen/quickstats/Mortality'
// import QuickStatsDetail from '../../screens/MalariaReportAppScreen/quickstats/QuickStatsDetail'



goBack = (navigation, route) => {
  if (route.params.routeName !== 'Favourites' && route.params.routeName != 'Home') {
    navigation.goBack(null);
    Keyboard.dismiss()
  }
  if ((route.params.routeName === 'Favourites') || (route.params.routeName === 'Search')) {
    navigation.replace('Home')
    Keyboard.dismiss()
  }
}

const CustomNavBar = ({ navigation, route, clickable }) => {
  if (clickable) {
    return (<View style={CustomNavBarstyles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}
        style={CustomNavBarstyles.leftBackButtonContainer}>
        <Icon name="ios-arrow-round-back" size={38} color="#fff" />
      </TouchableOpacity>
      <HeaderTitle navigation={navigation} />
      <View style={CustomNavBarstyles.rightBackButtonContainer} />
    </View>)

  } else {
    return (<View style={CustomNavBarstyles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}
        style={CustomNavBarstyles.leftBackButtonContainer}>
        <Icon name="ios-arrow-round-back" size={38} color="#fff" />
      </TouchableOpacity>
      <View style={CustomNavBarstyles.centerHeaderTitleContainer}>
        <Text style={CustomNavBarstyles.centerHeaderTitleText}
          numberOfLines={2}
          ellipsizeMode="middle">{route.params?.someParam ?? 'title'}</Text>
      </View>
      <View style={CustomNavBarstyles.rightBackButtonContainer} />
    </View>)
  }
}

const CustomNavBarstyles = StyleSheet.create({
  homeContainer: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.customColor.primaryColor,
    height: 50
  },
  container: {
    alignItems: 'center',
    backgroundColor: Theme.customColor.primaryColor,
    flexDirection: 'row',
    justifyContent: 'center',

  },
  leftBackButtonContainer: {
    height: 50,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'

  },
  rightBackButtonContainer: {
    height: 50,
    width: 60
  },
  centerHeaderTitleContainer: {
    flex: 2,
    height: 50,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centerHeaderTitleText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    fontFamily: Theme.customFont.fontSemiBold,
    textTransform: 'uppercase',
  }, centerHeaderHomeTitleText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
    top: -10,
    fontFamily: Theme.customFont.fontSemiBold,
    textTransform: 'uppercase'
  }
})

const defaultOptions = {
  defaultNavigationOptions: ({ navigation }) => ({
    header: <CustomNavBar navigation={navigation} clickable={false} />,
  })
}
const Stack = createNativeStackNavigator();
export default function HomeNavigator() {
  return (
   
      <Stack.Navigator 
      screenOptions={
                    headerMode= 'none',
                    header= null,
                    headerStyle= 
                    {backgroundColor: '#1555AA', borderBottomColor: '#1555AA', borderBottomWidth: 0 }

                    }>
      <Stack.Screen name="Home"
        component={MalariaPolicyGuidelinesHome}
      />
    </Stack.Navigator>

  );
}
const Drawer = createDrawerNavigator();
 export default function AppNavigator() {
  return (
   
      <Drawer.Navigator 
        screenOptions={
          contentComponent = (navigation) => <DrawerMenu navigation={navigation} />,
          drawerWidth = width - 50,
          useNativeAnimations = true,
          drawerType = 'overlay',
          backgroundColor = 'red',
          overlayColor = 'transparent',
          shadowColor = '#000000',
          shadowOpacity = 0.5
        } >
        <Drawer.Screen name="DrawerMenu" component={HomeNavigator} />
      </Drawer.Navigator>


  );
}
