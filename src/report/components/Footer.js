import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Image, TouchableNativeFeedback,  } from 'react-native';
import NavigationService from '../../report/utils/navigations/navigationService';
import Theme from '../styles/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Touchable = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;
const backProp = Platform.OS === "ios" ? null : TouchableNativeFeedback.SelectableBackground();

const FooterContainer = () => {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity style={styles.footerIcon} background={backProp} key="menu" onPress={() => NavigationService.drawer()}>
          <Image style={{ alignSelf: 'center', width: 20, height: 16, tintColor:'#202020' }} source={require('../assets/images/footer-icons/icn-menu.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerIcon} background={backProp} onPress={() => NavigationService.reset('MalariaReportHome', { title: 'MalariaReportHome' })} key="MalariaReportHome">
          <Image style={{ alignSelf: 'center', width: 20, height: 20, tintColor:'#202020' }} source={require('../assets/images/footer-icons/icn-house.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerIcon} background={backProp} key="CompareCountries" onPress={() => NavigationService.reset('CompareCountries', { title: 'CompareCountries' })}>
          {/* <Image style={{ alignSelf: 'center', width: 20, height: 18, tintColor:'#202020' }} source={require('../assets/images/footer-icons/icn-heart.png')} /> */}
          <AntDesign color="#202020" name="retweet" size={20} style={{alignSelf: 'center',}} />
    </TouchableOpacity>
      <TouchableOpacity style={styles.footerIcon} background={backProp} key="QuickStats" onPress={() => NavigationService.reset('QuickStats', { title: 'QuickStats' })}>
          {/* <Image style={{ alignSelf: 'center', width: 20, height: 20, tintColor:'#202020' }} source={require('../assets/images/footer-icons/icn-search.png')} /> */}
          <FontAwesome color="#202020" name="bar-chart-o" size={20} style={{alignSelf: 'center',}} />

      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 50,
    alignItems: 'center',
    justifyContent:'center'
  },
  footerIcon: {
    flex: 1,
    paddingVertical: 12
  }
});

export default FooterContainer
