import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
//import { shouldNavigate } from '../../guidelines/utils/helper';
import Theme from '../styles/Theme';

var paddingLength = 15 ;
var fontSize = 16 ;
const MenuItem = ({data, navigation, nav, style}) => {
  return (
    <TouchableOpacity style={style} onPress={() => navigation.navigate(data.menulabel)}>
      <Text style={styles.menuItemText}>{data.name.toUpperCase()}</Text>
    </TouchableOpacity>
  )  
}

const styles = StyleSheet.create({
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: paddingLength,
    paddingRight: paddingLength,
    borderRightColor: '#FFFFFF60',
  //  borderRightWidth: StyleSheet.hairlineWidth
  },
  menuItemText: {
    fontSize: 13,
    paddingTop: 4,
    paddingRight: 8,
    paddingLeft: 8,
    fontFamily: Theme.customFont.fontRegular,
    color: Theme.customColor.colorWhite
  }
});

export default MenuItem;
