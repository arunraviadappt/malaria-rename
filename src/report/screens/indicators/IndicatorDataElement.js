import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Accordion from 'react-native-collapsible/Accordion';
var { width, height } = Dimensions.get('window');
import Theme from '../../styles/Theme';
import HTML from 'react-native-render-html';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class IndicatorDataElement extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Indicators'
  });

  constructor(props) {
    super(props);
    this.state = {
      indicators: [],
      activeSections: [],
    }
  }

  componentDidMount() {
    let { indicators } = this.props;
    const indicatorCustomize = Object.keys(indicators).map((indicatorHeader) => {
      return {
        indicatorGroupName: indicatorHeader,
        elements: indicators[indicatorHeader]
      }
    });
    this.setState({ indicators: indicatorCustomize });
  }

  onItemSelected = (item) => {
    this.props.navigation.navigate('IndicatorDataElementCountriesList', { countriesListParam: item })
  }

  renderItem = ({ item }) => {
    const DEFAULT_PROPS = {
      tagsStyles: { i: { fontFamily: Theme.customFont.fontMediumItalic, fontSize: 13 } }
    };
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.headerText}>{`${item.indicatorGroupName}`}</Text>
        {
          Array.isArray(item.elements) && item.elements.map((indicatorData, idx) => {
            const { name, enabled, map } = indicatorData;
            if (enabled) {
              return (
                <TouchableOpacity key={`indicator-container-${idx}`} activeOpacity={0.2} onPress={() => this.onItemSelected(indicatorData)}>
                  <View style={[styles.dataElementStyle, { flex: 1, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: (idx % 2) === 0 ? '#fff' : '#f4f4f4' }]} key={`rindicator-subcontainer-${idx}`}>
                    <View style={{ width: width - 40 }}>
                      <HTML
                        {...DEFAULT_PROPS}
                        baseFontStyle={{ fontSize: 13, fontFamily: Theme.customFont.fontMedium, color: '#303030' }}
                        html={name.en}
                      />
                    </View>
                    {map && (
                      <View style={{ width: 20, height: 20, backgroundColor: Theme.color.orange, alignItems: 'center', justifyContent: 'center', paddingTop: 2, borderRadius: 2, }}>
                        {/* <Icon name="location" size={12} color="#fff" /> */}
                        <MaterialCommunityIcons name="map-marker-radius" size={16} color="#fff" />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              )
            }
          })
        }
      </View>
    )
  }

  render() {
    const { indicators } = this.state;
    return (
      <View style={styles.mainView}>
        <FlatList
          data={indicators}
          renderItem={this.renderItem}
          keyExtractor={item => item.indicatorGroupName}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#bef5f5',
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dataElementStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10
  },
  headerText: {
    backgroundColor: Theme.color.listEvenRowColor,
    fontFamily: Theme.customFont.fontBold,
    fontSize: 14,
    padding: 8,
    color: '#202020'
  },
  indicatorName: {
    fontSize: 13,
    fontFamily: Theme.customFont.fontMedium,
    color: '#303030',
    paddingHorizontal: 8,
    paddingVertical: 10
  }
});

const mapStateToProps = ({ indicators }) => {
  return {
    indicators: indicators.data,
  }
}

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorDataElement);
