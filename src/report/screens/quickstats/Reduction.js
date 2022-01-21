
import React, { PropTypes, Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import { shouldNavigate } from '../../utils/helper'
import Theme from '../../styles/Theme';
var { width, height } = Dimensions.get('window');

const mapStateToProps = state => {
  return {
   // nav: state.nav
  }
};

class Reduction extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Incidence & Mortality'
  });

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.row} onPress={() =>  this.props.navigation.navigate('Incidence')}>
          <View style={styles.rowInnerContainer}>
            <View style={styles.rowMainInnerContainer}>
              <Text allowFontScaling={false} style={styles.title}>REDUCTION IN CASE</Text>
              <Text allowFontScaling={false} style={styles.titleBold}>INCIDENCE</Text>
              <Text allowFontScaling={false} style={styles.title}>{`RATE ${this.props.route.params.incidentData.year}`}</Text>
              <Text allowFontScaling={false} style={styles.txtTitleOne}>{`${this.props.route.params.incidentData.incidence}`}</Text>
            </View>
            <View style={styles.iconContainer}>
                <View style={{width: 100, height: 100, backgroundColor: Theme.color.orange, position:'absolute', borderRadius: 50, bottom: -40, right: -140,transform: [{scaleX: 3}]}}></View>
                <Ionicons name='ios-arrow-forward' color='#fff' size={40} style={{top: 6}}/>
              </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => this.props.navigation.navigate('Mortality')}>
          <View style={styles.rowInnerContainer}>
            <View style={styles.rowMainInnerContainer}>
              <Text allowFontScaling={false} style={styles.title}>REDUCTION IN</Text>
              <Text allowFontScaling={false} style={styles.titleBold}>MORTALITY</Text>
              <Text allowFontScaling={false} style={styles.title}>{`RATE ${this.props.route.params.incidentData.year}`}</Text>
              <Text allowFontScaling={false} style={styles.txtTitleOne}>{`${this.props.route.params.incidentData.mortality}`}</Text>
            </View>
            <View style={styles.iconContainer}>
                <View style={{width: 100, height: 100, backgroundColor: Theme.color.orange, position:'absolute', borderRadius: 50, bottom: -40, right: -140,transform: [{scaleX: 3}]}}></View>
                <Ionicons name='ios-arrow-forward' color='#fff' size={40} style={{top: 6}}/>
              </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  row: {
    flex: 1,
    backgroundColor:'#fff'
  },
  rowContainer: {
    flex: 1
  },
  rowInnerContainer: {
    flex: 1,
    marginVertical: width > 330 ? 20 : 10,
    marginRight: 15,
    marginLeft: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    shadowColor: "#666",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10
  },
  rowMainInnerContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    paddingLeft: width > 330 ? 20 : 15,
    paddingTop: width > 330 ? 25 : 15
  },
  title: {
    fontSize: 16,
    color: '#555',
    fontFamily: Theme.customFont.fontMedium,
  },
  titleBold: {
    fontSize: 24,
    color: '#333',
    fontFamily: Theme.customFont.fontBold,
  },
  txtTitleOne: {
    fontSize: 36,
    color: Theme.color.pink,
    fontFamily: Theme.customFont.fontBold,
  },
  iconContainer: {
    flex: 0.20,
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent:'flex-end',
    overflow:'hidden',
    paddingRight: 18
  },
});
export default(Reduction)
