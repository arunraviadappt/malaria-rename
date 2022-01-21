import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Accordion from 'react-native-collapsible/Accordion';
var { width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../../styles/Theme';
import HTML from 'react-native-render-html';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class CompareInitiativeIndicator extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'COMPARE'
  });

  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      isAllExpanded: false,
      expandedSections: [],
    }
  }
  

  setExpandedSection = (index) => {
    let _expandedSections = this.state.expandedSections;
    let _findex = _expandedSections.indexOf(index);
    if (_findex > -1) {
      delete _expandedSections[_findex];
    } else {
      _expandedSections.push(index);
    }
    this.setState({ expandedSections: _expandedSections.filter(n => n >= 0) });
    this.setState({ isAllExpanded: this.state.expandedSections.length === this.props.indicators.length });
  }

  toggleAccordion() {
    let indicatorLength = this.props.indicators.length
    let TOTAL_INDICATORS_ARRAY = [...Array(indicatorLength).keys()];;
    this.setState({
      isAllExpanded: !this.state.isAllExpanded,
      expandedSections: (!this.state.isAllExpanded) ? [...TOTAL_INDICATORS_ARRAY] : []
    })
  }

  _renderHeader = (section, index, isActive) => {
    return (
      // <TouchableOpacity onPress={() => this.setExpandedSection(index)}>
      <View style={styles.header} >
        <Text style={styles.headerText}>{section.indicator}</Text>
        <View style={{ justifyContent: 'flex-end', width: 20, height: 20, flexDirection: 'row' }}>
          {isActive && <Icon style={{ paddingTop: 3 }} color='#3d3d3c' size={18} name='angle-up' />}
          {!isActive && <Icon style={{ paddingTop: 3 }} color='#3d3d3c' size={18} name='angle-down' />}
        </View>
      </View>
      // </TouchableOpacity>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  _renderContent = section => {
    const DEFAULT_PROPS = {
      tagsStyles: { i: { fontFamily: Theme.customFont.fontSemiBoldItalic, fontSize: 13 } }
    };

    return section.elements.map((ele, idx) => {
      return (
        <View style={{ flexDirection: 'column', flex: 1 }} key={`region-indicator-container-${idx}`}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

            <View style={{ alignItems: "flex-start", justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 8, width: width - 50 }}>
              <HTML
                {...DEFAULT_PROPS}
                baseFontStyle={{ fontSize: 13, fontFamily: Theme.customFont.fontSemiBold, color: '#595959', backgroundColor: 'transparent' }}
                html={ele.name['en']}
              />
              {/* <Text numberOfLines={3} style={styles.indicatorName}>{ele.name['en']}</Text> */}
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F0F0' }}>
            {ele.values.map((item, idx) => {
              return (
                <View key={idx} style={styles.indicatorValue}>
                  <Text style={styles.indicatorText}>{`${item.p_value}`}</Text>
                </View>
              )
            })}
          </View>
          {ele.values.map((item) => {
               return (item.value && item.value.length > 0) && item.value.map((value, idx) => {
              return (
                value.length > 0 && idx < 11 ? (
                  <View key={idx} style={{ width: width }} >
                  <View key={`rcontent-${idx}`} style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: (idx % 2) === 0 ? '#fff' : '#f2f6ff', paddingVertical: 6, paddingHorizontal: 15 }}>
                    <View style={{flex: 1}}><Text numberOfLines={3} style={[styles.monthText]}>{`${months[idx]}`}</Text></View>
                    <View style={{flex: 1}}><Text numberOfLines={3} style={[styles.indicatorText, { fontSize: 12 }]}>{ele.values[0] && ele.values[0].value && ele.values[0].value.length> 0 ? `${value}` : 'NA'}</Text></View>
                    <View style={{flex: 1}}><Text numberOfLines={3} style={[styles.indicatorText, { fontSize: 12 }]}>{ele.values[1] && ele.values[1].value && ele.values[1].value.length > 0   ? `${value}` : 'NA'}</Text></View>
                  </View>
                </View>
                ):null
              )
            })
          })}
        </View>
      )
    });
  };

  render() {
    const { indicators, countries } = this.props;
    return (
      <View style={styles.mainView}>
        {/* Its expanding accordion */}
        {/* <TouchableOpacity
          activeOpacity={0.7}
          style={{ paddingHorizontal: 13, paddingVertical: 6, alignSelf: 'flex-end' }}
          onPress={() => this.toggleAccordion()}>
          <FeatherIcon name={this.state.isAllExpanded ? 'minimize-2' : 'maximize-2'} size={20} color={Theme.color.orange} />
        </TouchableOpacity>
         */}
        <View style={{ backgroundColor: '#fdfdfd', flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 10 }}>
          {countries && countries.length > 0 && countries.map((country) => {
            return (
              <View key={`compare-country-container-${country.name}`} style={{ flex: 1, justifyContent: 'center', flexWrap: 'wrap', paddingHorizontal: 5 }}>
                <Text style={styles.compareCountryText}>{country.name}</Text>
              </View>
            )
          })}
        </View>
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ flexGrow: 1 }}>
          {indicators && indicators.length > 0 && <Accordion
            underlayColor={'white'}
            sections={indicators}
            activeSections={this.state.activeSections}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
          />}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    borderRadius: 20,
    width: 40,
    height: 40
  },
  header: {
    backgroundColor: Theme.color.listEvenRowColor,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerText: {
    fontFamily: Theme.customFont.fontBold,
    fontSize: 13,
    width: width - 60,
    color: '#202020'
  },
  indicatorName: {
    fontSize: 13,
    fontFamily: Theme.customFont.fontSemiBold,
    color: '#595959', width: width - 50, backgroundColor: 'transparent'
  },
  indicatorValue: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  monthText: {
    textAlign: 'left',
    fontFamily: Theme.customFont.fontSemiBold,
    fontSize: 13,
  },
  indicatorText: {
    textAlign: 'center',
    fontFamily: Theme.customFont.fontSemiBold,
    fontSize: 13,
  },
  compareCountryNameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#359edb',
    padding: 10
  },
  compareCountryText: {
    textAlign: 'center',
    fontFamily: Theme.customFont.fontSemiBold,
    color: '#000'
  }
});

const mapStateToProps = ({ initiatives }) => ({
  indicators: initiatives.comparedIndicators,
  countries: initiatives.selectedCountries,
  isLatestYear: initiatives.isLatestYear,
  year: initiatives.year
});

export default connect(mapStateToProps, {})(CompareInitiativeIndicator);

