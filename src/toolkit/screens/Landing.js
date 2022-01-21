import React, { Component } from 'react';
import { Text, View,StatusBar, StyleSheet, Dimensions, TouchableOpacity, Image, Linking, ImageBackground, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Theme from '../../guidelines/styles/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
var { width, height } = Dimensions.get('window');
import {ifIphoneX} from 'react-native-iphone-x-helper';
//import NavigationService from '../../guidelines/utils/navigations/navigationService';
var dummyDeepLinkedUrl;
const aspectRatio = height/width;
class Landing extends Component {

  componentDidMount = () => {
    SplashScreen.hide();
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        if (url && url != dummyDeepLinkedUrl) {
          this._handleOpenURLFurther(url);
        }
      });
    } else {
      Linking.addEventListener('url', this._handleOpenURL.bind(this));
    }
  }

  _handleOpenURL(event) {
    this._handleOpenURLFurther(event.url);
  }

  _handleOpenURLFurther(url) {
    // console.log('log >> url >>', url, typeof url); // For example: 'whomalariatoolkit://678/en'
    const route = url.replace(/.*?:\/\//g, '');
    const params = route.split("/");
    if (params && params.length === 2) {
      this.props.navigation.navigate('GuidelineApp ');
      dummyDeepLinkedUrl = url;
    }
  }

  navigationToApp = (type) => {
    if (type == 'malariaGuideLine') {
      this.props.navigation.navigate(  'GuidelineApp' );
    } else if(type == 'malariaTerminology'){
      this.props.navigation.navigate(  'MalariaTerminology' );
    }
    else {
      this.props.navigation.navigate( 'reportApp' );
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  render() {
    const image=[require('../assets/images/report.png'), require('../assets/images/guidance.png'),require('../assets/images/terminology.png')]
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#d5d4d6' }}>
        <View style={styles.container}>
          <View style={styles.landingTop}>
            <ImageBackground source={require('../assets/images/treebg.png')} style={{width: "80%",height: "98%",marginHorizontal: 20,    position: 'absolute', bottom:-20, left: 0}}  imageStyle={{resizeMode: "contain", alignSelf: "flex-end", justifyContent:'flex-start'}}>
              <View style={{flex:1, justifyContent:'flex-end', marginBottom: '15%'}}>
              <Text allowFontScaling={false} style={{fontFamily: Theme.customFont.fontBold,color: '#0390d5', fontSize: 30}}>WHO</Text>
              <Text allowFontScaling={false} style={{fontFamily: Theme.customFont.fontSemiBold,color: '#202020', fontSize: 24}}>Malaria Toolkit</Text>
              </View>
            </ImageBackground>
            <View style={{backgroundColor:'#d5d4d6', height: 50, width: 50, position:'absolute', bottom:0, right:0}}>
              <View style={{backgroundColor:'#fff',height: 50, width: 50, borderRadius: 25}}/>
              <View style={{backgroundColor:'#fff', height: 25, width: 50, position:'absolute', top:0}}/>
              <View style={{backgroundColor:'#fff', height: 50, width: 25, position:'absolute', left:0}}/>
            </View>
          </View>

          <View style={styles.landingBottom}>

            <TouchableOpacity style={styles.toolkitBlock} onPress={() => this.navigationToApp('malariaReport')}>
              <View style={styles.toolkitTextBlock}>
                <Ionicons name="ios-arrow-forward" color="#2866c7" size={36} />
                <Text allowFontScaling={false} style={styles.toolkitText} numberOfLines={2}>{('World malaria\nreport data').toUpperCase()}</Text>
              </View>
              <Image source={image[0]} style={styles.toolkitIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.toolkitBlock]} onPress={() => this.navigationToApp('malariaGuideLine')}>
              <View style={styles.toolkitTextBlock}>
              <Ionicons name="ios-arrow-forward" color="#2866c7" size={36} />
                <Text allowFontScaling={false} adjustsFontSizeToFit style={styles.toolkitText} numberOfLines={2}>{( 'Guidelines\nfor malaria').toUpperCase()}</Text>
              </View>
              <Image  source={image[1]} style={styles.toolkitIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.toolkitBlock]} onPress={() => this.navigationToApp('malariaTerminology')}>
              <View style={styles.toolkitTextBlock}>
              <Ionicons name="ios-arrow-forward" color="#2866c7" size={36} />
                <Text allowFontScaling={false} adjustsFontSizeToFit style={styles.toolkitText} numberOfLines={2}>{('Who Malaria\nterminology').toUpperCase()}</Text>
              </View>
              <Image source={image[2]} style={styles.toolkitIcon} />
            </TouchableOpacity>

          </View>
        </View>
      </SafeAreaView>
    )
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    ...ifIphoneX({bottom: 45},{bottom: 20})
  },
  landingTop: {
    flex:.6,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  landingBottom: {
    backgroundColor: '#d5d4d6',
    justifyContent: 'space-between',
    flex: 1.4,
    borderTopLeftRadius: 30,
    paddingBottom: 10,
    paddingTop: 20
  },
  toolkitBlock: {
    marginTop:10,
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignSelf: 'center',
    // height: width > 600 ? (height/3.1- 130) : (height/2.8- 130),
    height :
     (width >= 300 && width <= 400 && height >= 400 && height <= 650) ? (height/2.5- 130) : null
    || (width >= 300 && width <= 400) ? (height/2.8- 130) : null
    || (width >= 400 && width <= 430) ?  (height/2.65- 130) :null
    || (width >= 430 && width <= 450) ?  (height/2.9- 130) :  null 
    || (width >= 450 && width <= 500) ?  (height/3.1- 130) :(height/3.1- 130) ,
    width: width - 35,
    shadowColor: "#a6a2ab",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 7,
    ...ifIphoneX({height: 140})
  },
  toolkitTextBlock: {
    flex: .6,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingTop: 8,
    backgroundColor:'transparent'

  },
  toolkitText: {
    textAlign: 'left',
    fontSize: width > 568 ? 20 : 16,
    color: '#000',
    fontFamily: Theme.customFont.fontMedium,
    width: width - 160,
    paddingBottom: 10,
    backgroundColor:'transparent',

  },
  toolkitIcon: {
    // height:width>600? 180: 130,
    // width:width>600? 180:130,
    height:
    (width >= 300 && width <= 400 && height >= 400 && height <= 650) ? 100 : null
    || (width >= 300 && width <= 400) ? 120 : null
    || (width >= 400 && width <= 430) ?  120 :null
    || (width >= 430 && width <= 450) ?  140 :  null 
    || (width >= 450 && width <= 500) ?  180 : 180,

    width: 
    (width >= 300 && width <= 400 && height >= 400 && height <= 650) ? 100 : null
    ||(width >= 300 && width <= 400) ? 120 : null
    || (width >= 400 && width <= 430) ?  130 :null
    || (width >= 430 && width <= 450) ?  140 :  null 
    || (width >= 450 && width <= 500) ?  180 : 180,

    resizeMode: 'contain',
    right: 15,
    top: -10,
    flex: .5,
    position: 'absolute',

  }
});

export default Landing
