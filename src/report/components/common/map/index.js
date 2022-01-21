import React, { Component } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import ArgisMap from "../../../modules/arcgis";
import Theme from '../../../styles/Theme';
let { width, height } = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign'
import HTML from 'react-native-render-html';
import NetworkCheck from "../errors/network";
const disclaimerImgSrc = require('../../../assets/images/WHO.png')
const DEFAULT_PROPS = {
  tagsStyles: { i: { fontFamily: Theme.customFont.fontBold, fontSize: 16 }, p: { marginVertical: 8 } }
};
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    }
  }
  render() {
    const { data, legends, disclaimer, initiativeData, initiativeLegends } = this.props;
    const { isInitiative, title } = this.props.route.params;
    const _legends = (isInitiative ? initiativeLegends : legends);
    const _data = (isInitiative ? initiativeData : data);
    return (
      <View style={{ flex: 1 }}>
        <NetworkCheck>
          <View style={styles.titleContainer}>
            <HTML
              {...DEFAULT_PROPS}
              baseFontStyle={styles.baseStyle}
              html={title}
            />
          </View>
          <View style={{ height: height / 2, overflow: 'hidden' }}>
            <ArgisMap originWhitelist={[""]} style={{ height: height / 2 }} data={_data} legends={_legends} />
          </View>
          <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 13, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            {_legends.map((legend) => (
              <View style={{ flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center', paddingBottom: 5 }} key={`legend-${legend.name}`}>
                <View style={{ backgroundColor: legend.color, padding: 6, borderRadius: 20, width: 10, height: 10, marginRight: 6, borderWidth: 1, borderColor: '#eee' }} ></View>
                <Text style={{ fontFamily: Theme.customFont.fontMedium, fontSize: 13, color: '#333' }}>{legend.name}</Text>
              </View>
            ))}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => this.setState({ isModalVisible: true })}
              activeOpacity={Theme.active.opacity}
              style={styles.disclaimerBtnStyle}>
              <Text style={{ color: '#fff', fontFamily: Theme.customFont.fontSemiBold }}>DISCLAIMER</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isModalVisible}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={styles.disclaimerContainer}>
                <View style={styles.disclaimerCloseContainer}>
                  <TouchableOpacity activeOpacity={Theme.active.opacity} onPress={() => this.setState({ isModalVisible: false })}>
                    <AntDesign name="closecircleo" color="#1e787c" size={25} />
                  </TouchableOpacity>
                </View>
                <ScrollView style={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Image
                    style={{ height: 70, width: 225, marginTop: 10, alignSelf: 'center' }}
                    source={disclaimerImgSrc}
                  />
                  <HTML
                    {...DEFAULT_PROPS}
                    baseFontStyle={{ fontSize: 15, fontFamily: Theme.customFont.fontRegular, color: '#595959', backgroundColor: 'transparent' }}
                    html={disclaimer}
                  />
                </ScrollView>
              </View>
            </View>
          </Modal>
        </NetworkCheck>
      </View>
    )
  }
}
const mapStateToProps = ({ map, generalContent }) => {
  return {
    data: map.data,
    legends: map.legends,
    disclaimer: generalContent.data.mapdisclaimer,
    initiativeData: map.initiativeMap,
    initiativeLegends: map.initiativeLegends
  }
}
const styles = StyleSheet.create({
  disclaimerContainer: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 10,
    marginBottom: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    paddingBottom: 10
  },
  disclaimerCloseContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center'
  },
  disclaimerBtnStyle: {
    marginBottom: 13,
    backgroundColor: '#1e787c',
    height: 38,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: Theme.customFont.fontRegular,
    paddingHorizontal: 20
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  baseStyle: {
    fontSize: 16,
    fontFamily: Theme.customFont.fontBold,
    color: '#303030',
    textAlign: 'center'
  },
})
export default connect(mapStateToProps)(Map);
