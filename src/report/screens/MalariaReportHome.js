import React, { Component } from 'react';
import { Text, View, StatusBar, ScrollView, StyleSheet, Button, ActivityIndicator, Dimensions, TouchableOpacity, Image, Linking, Platform, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import HomeTagsItem from '../components/HomeTagsItem';
import MainMenu from '../components/home/MainMenu';
import { menu } from './menu.json';
import MenuItem from './MenuItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from "lodash";
import Theme from '../styles/Theme';
var S = require('string');
var { width, height } = Dimensions.get('window');
var RNFS = require('react-native-fs');
import Carousel from 'react-native-looped-carousel';
import HTML from 'react-native-render-html';
import navigationService from "../../toolkit/navigations/navigationService";
let maxTextLength = height > 500 && height <= 690 ? height/7 : height/2.2;

class MalariaReportHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newsViewData: []
    }
  }

  componentDidMount() {
  }

  renderCarousalView(item, index) {
    var newsItemMaxTextLength = maxTextLength; // 150
    let newsDetails = item.description.en;
    if (item.description.en.includes("<a href") === true && (item.description.en.includes("<a href=\"#") === false)) {
      // let androidNewsItemMaxTextLength = height > 500 && height <= 690 ? newsItemMaxTextLength + 140 : newsItemMaxTextLength + 200;
      // newsItemMaxTextLength = Platform.OS === 'ios' ? newsItemMaxTextLength + 200 : androidNewsItemMaxTextLength;

      newsItemMaxTextLength = height > 500 && height <= 690 ? height/6 + 220 : height/2.6 + 220;
    }
    const truncate = _.truncate;
    let htmlNews = newsDetails.replace(/(\r\n|\n|\r)/gm, " ");
    return (
      <ScrollView style={{ flex:1, backgroundColor: '#fff' }} key={`carousel-container-${item.title}`}>
        <View style={styles.guidelinesBottomTextView}> 
          <Text allowFontScaling={false} style={[styles.guidanceBottomText, { marginTop: 10, marginBottom: 10, flexWrap:'wrap', width: width - 30, marginHorizontal: 5 }]}>
            {`${item.title.en}`} 
          </Text>
          <HTML
            baseFontStyle={{ fontFamily: Theme.customFont.fontRegular, fontSize: 14, color: '#202020' }}
            html={htmlNews.trim().length > newsItemMaxTextLength ? truncate(htmlNews, {length: newsItemMaxTextLength, separator:/,?\.* +/}).trim() : newsDetails.replace(/(\n+|\r+)/gm, ' ').trim()}
            allowFontScaling={false}
            onLinkPress={(event, href) => {
              Linking.openURL(href)
            }}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.props.navigation.navigate('NewsDetails', { newsDetails: newsDetails, title: item.title.en })}
            style={{ backgroundColor: '#1e787c', height: 40, width: 100, borderRadius: 5, alignItems: 'center', justifyContent: 'center', fontFamily: Theme.customFont.fontRegular, marginBottom: 20 }}>
            <Text allowFontScaling={false} style={{ color: '#fff' }}>READ MORE</Text>
          </TouchableOpacity>
          {/* <Text style={{ fontSize: 14, fontFamily: Theme.customFont.fontRegular, color: '#000', marginLeft: 20, marginRight: 20 }}>
            {item.field_carousel}
          </Text> */}
        </View>
      </ScrollView>
    )
  }

  onNavigate = (value) => {
    const { navigation, nodeMap } = this.props;
    if (value && value.nids.length > 1) {
      navigation.navigate({ routeName: 'Tags', params: { nids: value.nids, data: value, title: value.name }, key: 'hometag' })
    } else {
      let data = nodeMap[value.nids[0]];
      navigation.navigate('CarousalView', data)
    }
  }

  navigateToAppKit = () => navigationService.navigate('Landing');

  render() {
    let { newsData, reportYear } = this.props;
    return (
      <View style={styles.container}>
        {/* Landing image */}
        <View style={styles.guidanceTop}>
          <TouchableOpacity activeOpacity={1} onPress={this.navigateToAppKit} style={{ flexDirection: 'row', flex: 6 }}>
            <EvilIcons name="chevron-left" color="#fff" size={45}/>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Text allowFontScaling={false} style={[{ color: '#fff', fontFamily: Theme.customFont.fontRegular, fontSize: 22 }]}>{width > 600 ? (`World Malaria Report ${reportYear}`) : (`World Malaria\nReport ${reportYear}\n`)}</Text>
            </View>
          </TouchableOpacity>
          {/* <View style={{ flex: 4, zIndex: 999, height: 180, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', opacity: .7 }}>
            <Image source={require('../assets/images/reportbg.png')} style={{ height: 165, width: 162, resizeMode: 'contain', position: 'absolute', bottom: 0 }} />
          </View> */}
        </View>

        {/* Main menu list on horizontal */}
        <View style={{ flexDirection: 'row', backgroundColor: '#2ca3a8' }}>
          <View style={{ backgroundColor: '#1e787c', width: width, zIndex: 5, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 10, borderTopLeftRadius: 25 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {menu.map((data, i) => {
                return <MenuItem key={`menu-item-container-${i}`} data={data} navigation={this.props.navigation} nav={this.props.nav} style={{
                  paddingTop: 4,
                  paddingRight: 8,
                  paddingLeft: 8,
                  fontFamily: Theme.customFont.fontRegular,
                  color: Theme.customColor.colorWhite
                }} />
              }
              )}
            </ScrollView>
          </View>
        </View>

        {/* News carousel section */}
        <View style={styles.guidanceBottom}>
          {newsData && newsData.length > 0 ?
            <View style={{flex:1}} onLayout={this._onLayoutDidChange}>
              <Carousel
                autoplay={false}
                style={{ flex:1 }}
                bullets={true}
                bulletsContainerStyle={Platform.OS === 'ios' ? styles.bulletContainer : styles.bulletContinerAndroid}
                bulletStyle={{ backgroundColor: '#5bd1d5', height: 10, width: 10, marginHorizontal: 5 }}
                chosenBulletStyle={{ backgroundColor: '#1e787c', height: 10, width: 10, marginHorizontal: 5 }}
              >
                {newsData.map((h) => { return this.renderCarousalView(h); })}
              </Carousel>
            </View> : <Text>Loading...</Text>}
          {/* <TouchableOpacity
            activeOpacity={0.7}
            style={{ margin: 20, backgroundColor: '#F68D23', height: 40, width: 100, borderRadius: 5, alignItems: 'center', justifyContent: 'center', fontFamily: Theme.customFont.fontRegular }}>
            <Text style={{ color: '#fff' }}>READ MORE</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    )
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e787c',
  },
  guidanceTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    backgroundColor: '#2ca3a8',
    height: height > 500 && height <= 690 ? 150 : 180
  },
  guidanceBottom: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex:1,
    // width: width,
    // height: height,
    zIndex: 99,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  newsTitleStyle: {
    fontSize: 17,
    color: '#202020',
    fontFamily: Theme.customFont.fontBold,
    paddingHorizontal: 15,
    paddingVertical: 25
  },
  guidanceitems: {
    width: width - 20,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    backgroundColor: Theme.color.pink,
    alignSelf: 'center',
    alignItems: 'center',
    height: 60,
    marginBottom: 30,
    shadowColor: "#999",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 7,
  },
  guidanceBottomText: {
    fontSize: 17,
    fontFamily: Theme.customFont.fontSemiBold,
    // width: width,
    backgroundColor: 'transparent',
    color: '#000',
    // paddingRight: 20,
  },
  guidanceitemsText: {
    fontSize: 16,
    fontFamily: Theme.customFont.fontMedium,
    width: width - 50,
    backgroundColor: 'transparent',
    color: Theme.color.white,
    left: 15
  },
  guidanceitemsIcon: {
    height: 36,
    width: 36,
    right: 20,
    borderRadius: 18,
    backgroundColor: '#bc5780',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bulletContainer: {
    paddingRight: 5, 
    bottom: -5,
    position:'absolute'
  },
  bulletContinerAndroid: {
    paddingRight: 5, 
    // bottom: height > 500 && height <= 690 ? -5 : -35 
  }
});

const mapStateToProps = state => {
  // console.log('malaria report home >>>', state);
  return {
    newsData: state.news.data ? state.news.data : [],
    reportYear: state.generalContent.data.reportYear,
    // languageCode: state.appState.language,
    // nodeMap: state.nodeMap.nodeMap
  }
};

export default connect(mapStateToProps)(MalariaReportHome)
