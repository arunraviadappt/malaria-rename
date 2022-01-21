import React, { PropTypes, Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, AsyncStorage, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { shouldNavigate } from '../../utils/helper'
var Global = require('../../config/config');
import * as Progress from 'react-native-progress';
import Theme from '../../styles/Theme';
const { width, height } = Dimensions.get('window');

class QuickStats extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Quick Stats'
  });

  constructor(props) {
    super(props);
  }

  render() {
    const { overall } = this.props;
    return (
      <View style={{ flex: 1, paddingTop: width > 330 ? 10 : 2 }}>
        <TouchableOpacity style={styles.row} onPress={() => this.props.navigation.navigate('Cases')}>
          <View style={styles.rowInnerContainer}>
          {width > 330 && <View style={[styles.badge, { backgroundColor: '#2bc2ed' }]}>
              {/* <MaterialCommunityIcons name='lightbulb-on' color='#fff' size={42} /> */}
              <Image source={require('../../assets/images/quickstats/cases.png')} style={{tintColor:'#fff', width: 40, height: 31}} />
            </View>}
            <Image source={require('../../assets/images/quickstats/lines.png')} style={{tintColor:'#f5f5f5', width: width - 50, height: height / 6, position:'absolute', bottom:1, right:0}} />
            <View style={styles.rowMainInnerContainer}>
              <Text allowFontScaling={false} style={styles.title}>CASES</Text>
              <Text allowFontScaling={false} style={styles.txtTitleOne}>{`${overall.cases ? overall.cases : ''}`}</Text>
              {overall.vivax &&
                <Text style={{marginTop:-5, color:'#303030'}}>({overall.vivax} <Text style={{fontStyle:'italic'}}>P.vivax</Text> cases)</Text>
              }
            </View>
            <View style={styles.iconContainer}>
              <View style={{ width: 100, height: 100, backgroundColor: Theme.color.orange, position: 'absolute', borderRadius: 50, bottom: -40, right: -140, transform: [{ scaleX: 3 }] }}></View>
              <Ionicons name='ios-arrow-forward' color='#fff' size={40} style={{ top: 6, left: 6 }} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => this.props.navigation.navigate('Death')}>
          <View style={styles.rowInnerContainer}>
            {width > 330 && <View style={[styles.badge, { backgroundColor: '#4aecc7' }]}>
              {/* <MaterialCommunityIcons name='account-circle' color='#fff' size={42} /> */}
              <Image source={require('../../assets/images/quickstats/death.png')} style={{tintColor:'#fff', width: 40, height: 40}} />
            </View>}
            <Image source={require('../../assets/images/quickstats/lines.png')} style={{tintColor:'#f5f5f5', width: width - 50, height: height / 6, position:'absolute', bottom:1, right:0}} />
            <View style={styles.rowMainInnerContainer}>
              <Text allowFontScaling={false} style={styles.title}>DEATHS</Text>
              <Text allowFontScaling={false} style={styles.txtTitleOne}>{`${overall.death ? overall.death : ''}`}</Text>
            </View>
            <View style={styles.iconContainer}>
              <View style={{ width: 100, height: 100, backgroundColor: Theme.color.orange, position: 'absolute', borderRadius: 50, bottom: -40, right: -140, transform: [{ scaleX: 3 }] }}></View>
              <Ionicons name='ios-arrow-forward' color='#fff' size={40} style={{ top: 6, left: 6 }} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => this.props.navigation.navigate('Reduction', { incidentData: overall })}>
          <View style={styles.rowInnerContainer}>
          {width > 330 && <View style={[styles.badge, { backgroundColor: '#73a3fe' }]}>
              {/* <MaterialCommunityIcons name='hospital' color='#fff' size={42} /> */}
              <Image source={require('../../assets/images/quickstats/incidence.png')} style={{tintColor:'#fff', width: 40, height: 27}} />
            </View>}
            <Image source={require('../../assets/images/quickstats/lines.png')} style={{tintColor:'#f5f5f5', width: width - 50, height: height / 6, position:'absolute', bottom:1, right:0}} />
            <View style={styles.rowMainInnerContainer}>
              <Text allowFontScaling={false} style={styles.title}>CASE & MORTALITY INCIDENCE</Text>
            </View>
            <View style={styles.iconContainer}>
              <View style={{ width: 100, height: 100, backgroundColor: Theme.color.orange, position: 'absolute', borderRadius: 50, bottom: -40, right: -140, transform: [{ scaleX: 3 }] }}></View>
              <Ionicons name='ios-arrow-forward' color='#fff' size={40} style={{ top: 6 }} />
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
    backgroundColor: '#fff'
  },
  rowInnerContainer: {
    flex: 1,
    marginTop: width > 330 ? 30 : 10,
    marginBottom: width > 330 ? 20 : 10,
    marginRight: 15,
    marginLeft: width > 330 ? 30 : 15,
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
    paddingLeft: width > 330 ? 8 : 15,
    paddingTop: width > 330 ? 25 : 15,
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 24,
    color: '#333',
    fontFamily: Theme.customFont.fontBold,
    lineHeight: 28
  },
  txtTitleOne: {
    fontSize: 36,
    color: Theme.color.pink,
    fontFamily: Theme.customFont.fontBold
  },
  iconContainer: {
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    paddingRight: 18,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60
  },
  badge: {
    width: 65,
    height: 65,
    marginLeft: -20,
    marginTop: -30,
    borderRadius: 10,
    shadowColor: "#555",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = ({ quickStats }) => ({
  overall: (quickStats.data && quickStats.data.overall ? quickStats.data.overall : {})
});

export default connect(mapStateToProps)(QuickStats);
