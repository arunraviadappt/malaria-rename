import React, { Component } from 'react';
import { View, Dimensions, FlatList, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SwitchSelector from "react-native-switch-selector";
import creator from "../../redux/actionCreators";
import Accordion from 'react-native-collapsible/Accordion';
import Theme from '../../styles/Theme';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import HTML from 'react-native-render-html';
var { width, height } = Dimensions.get('window');
import FeatherIcon from 'react-native-vector-icons/Feather';
const language = 'en';

const optionsLabel = ["Published Data", "Latest Data"];

class InitiativeIndicator extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: route.params && route.params && route.params.name ? route.params.name : ''
  });

  constructor(props) {
    super(props);
    this.state = {
      indicators: [],
      options: [],
      switchYear: false,
      year: null,
      activeSections: [],
      yearSelected: '',
      isAllExpanded: false,
      expandedSections: [],
      latestYear : [],
    }
  }

  componentDidMount() {
    const { code } = this.props.route.params;
    const { initiativeIndicatorByCountries } = this.props;
    if (code && code.length && initiativeIndicatorByCountries && initiativeIndicatorByCountries[code]) {
      const yearData = Object.keys(initiativeIndicatorByCountries[code]).map((year) => initiativeIndicatorByCountries[code][year]);
      let yearOptions = Object.keys(initiativeIndicatorByCountries[code]).map((key, idx) => ({ label: optionsLabel[idx], value: key }));
      yearOptions = yearOptions && yearOptions.length > 2 ? yearOptions.slice(0, yearOptions.length - 1) : yearOptions;

      this.setState({
        options: yearOptions
      });
       let _years = Object.keys(initiativeIndicatorByCountries[code]);
       this.setState({latestYear : _years});
      const indicators = Object.keys(yearData[0]).map((indicatorName) => ({
        indicatorGroupName: indicatorName,
        elements: yearData[0][indicatorName]
      }));
      this.setState({ indicators });
    }
  }

  updateIndicatorsByYear = (selectedYear) => {
    this.setState({ activeSections: [] });
    this.setState({ yearSelected: selectedYear })
    const { code } = this.props.route.params;
    const { initiativeIndicatorByCountries } = this.props;
    const indicators = Object.keys(initiativeIndicatorByCountries[code][selectedYear]).map((indicatorName) => ({
      indicatorGroupName: indicatorName,
      elements: initiativeIndicatorByCountries[code][selectedYear][indicatorName]
    }));
    this.setState({ indicators });
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
    this.setState({ isAllExpanded: this.state.expandedSections.length === this.state.indicators.length });
  }

  toggleAccordion() {
    let indicatorLength = this.state.indicators.length
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
        <Text style={styles.headerText}>{section.indicatorGroupName}</Text>
        <View style={{ justifyContent: 'flex-end', width: 20, height: 20, flexDirection: 'row' }}>
          {isActive && <Icon style={{ paddingTop: 3 }} color='#3d3d3c' size={18} name='angle-up' />}
          {!isActive && <Icon style={{ paddingTop: 3 }} color='#3d3d3c' size={18} name='angle-down' />}
        </View>
      </View>
      // </TouchableOpacity>
    );
  };

  chartPreparation = (item) => {
    let { chart, chartData, name } = item;
    const { state: { params } } = this.props.navigation;
    let countryNameTitle = params && params.name ? params.name : '';
    switch (chart) {
      case 'Line or Bar':
        // All values are zero
        let hasNoValuesAtAll = Object.values(chartData[0].value).every(item => item === 0);
        let finalChartData = [];
        Object.keys(chartData[0].value).forEach(function eachKey(key) {
          let pushingChartData = [];
          pushingChartData.push(key.toString());
          pushingChartData.push(chartData[0].value[key]);
          finalChartData.push(pushingChartData);
        });
        this.props.navigation.navigate('RegionBarChart', {
          chartDataSet: [finalChartData],
          title: name ? name : '',
          isAllZero: hasNoValuesAtAll,
          countryName: countryNameTitle
        });
        break;
      default:
        break;
    }
  }

  _renderContent = section => {
    const DEFAULT_PROPS = {
      tagsStyles: { i: { fontFamily: Theme.customFont.fontSemiBoldItalic, fontSize: 13 } }
    };
    return (
      section.elements.map((ele, idx) => {
        const dynamicBgColor = (ele.p_value === undefined) ? '#d7d7d7' : ((idx % 2) === 0 ? '#fff' : '#F0F0F0');
        const isChartIcon = !(ele.chart == "" || ele.chart == "Yes/No - no chart");
        const value = (ele.p_value === undefined) ? ele.total : ele.p_value;
        let selectedYear = this.state.yearSelected;
        return (
          <View key={`initiative-indicator-container-${ele.name}`}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.chartPreparation(ele)} style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', flex: 1, backgroundColor: dynamicBgColor, alignItems: 'center' }} key={`initiative-indicator-container-${ele.name}`}>
              <View style={{ width: width - 100, paddingVertical: 7, paddingHorizontal: 10 }}>
                <HTML
                  {...DEFAULT_PROPS}
                  baseFontStyle={{ fontSize: 13, fontFamily: Theme.customFont.fontSemiBold, color: '#303030' }}
                  html={ele.name}
                />
              </View>
              <Text numberOfLines={2} style={[styles.indicatorText, { paddingRight: 15 }]}>{value}</Text>
              {isChartIcon && (
                <View onPress={() => this.chartPreparation(ele)}>
                  <View style={{ width: 18, height: 18, backgroundColor: Theme.color.orange, marginLeft: 10, alignItems: 'center', justifyContent: 'center', paddingTop: 2, borderRadius: 2, marginRight: 5 }}>
                    <Entypo color={Theme.color.white} size={12} name='bar-graph' />
                  </View>
                </View>
              )}
            </TouchableOpacity>
            
            {
              (ele.p_value === undefined && ele.value && ele.value.length > 0) && ele.value[0].map(({ month, value, year }, idx) => {
                return (
                  <View key={idx}>
                     {
                        year && year.length > 0 ? 
                       (
                       <View >
                       <View style={[styles.indicatorValue, { width: width, alignSelf: 'center' }]} key={`child-data-element-${idx}`}>
                       <View key={`rcontent-${idx}`} style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: (idx % 2) === 0 ? '#fff' : '#F0F0F0', paddingVertical: 6, paddingHorizontal: 15 }}>
                        <Text numberOfLines={3} style={[styles.indicatorText]}>{`${month}`}</Text>
                       <Text numberOfLines={3} style={[styles.indicatorText, { fontSize: 12 }]}>{`${value}`}</Text>
                       </View>
                        </View>
                        <View style={styles.headerYear}>
                        <Text style={styles.headerYearText}>{`${selectedYear}`}</Text>
                        </View>
                        </View>
                       ) : (
                        <View key={`rcontent-${idx}`} style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: (idx % 2) === 0 ? '#fff' : '#F0F0F0', paddingVertical: 6, paddingHorizontal: 15 }}>
                           <Text numberOfLines={3} style={[styles.indicatorText]}>{`${month}`}</Text>
                       <Text numberOfLines={3} style={[styles.indicatorText, { fontSize: 12 }]}>{`${value}`}</Text>
                          </View>
                       )
                     }
                    </View>
                )
              })
            }
             {
               ele.value.length > 1 ?
               (
                <View style={styles.headerYear}>
                <Text style={styles.headerYearText}>{this.state.latestYear[2]}</Text>
                  </View>
               ):null
             }
          {
            (ele.p_value === undefined && ele.value && ele.value.length > 1) && ele.value[1].map(({ month, value}, idx) => {
              return (
                      <View key={`rcontent-${idx}`} style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: (idx % 2) === 0 ? '#fff' : '#F0F0F0', paddingVertical: 6, paddingHorizontal: 15 }}>
                         <Text numberOfLines={3} style={[styles.indicatorText]}>{`${month}`}</Text>
                     <Text numberOfLines={3} style={[styles.indicatorText, { fontSize: 12 }]}>{`${value}`}</Text>
                        </View>
              )
            })
          }
          </View>
        )
      })
    )
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };


  render() {
    const { indicators, options } = this.state;
    return (
      <View style={styles.mainView}>
        {/* Its expanding accordion */}
        {/* <TouchableOpacity
          activeOpacity={0.7}
          style={{ paddingHorizontal: 13, paddingVertical: 6, alignSelf: 'flex-end' }}
          onPress={() => this.toggleAccordion()}>
          <FeatherIcon name={this.state.isAllExpanded ? 'minimize-2' : 'maximize-2'} size={20} color={Theme.color.orange} />
        </TouchableOpacity> */}
        <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.container}>
          {options.length > 1 ?  (
            <SwitchSelector
              options={options}
              initial={0}
              onPress={this.updateIndicatorsByYear}
              selectedColor={Theme.color.white}
              buttonColor={Theme.color.orange}
              style={{ marginBottom: 10 }}
            />
          ) : null}
          {(indicators && indicators.length > 0) ? (
            <Accordion
              sections={indicators}
              activeSections={this.state.activeSections}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              onChange={this._updateSections}
              underlayColor={'white'}
            />
          ) : (
            <View style={{flex: 1, paddingTop: 20}}>
              <Text style={{ textAlign: 'center',fontFamily: Theme.customFont.fontSemiBold }}>No Data Available</Text>
              </View>
            )}
          {this.state.options.length === 1 && (
            <View style={{ borderTopWidth: 1, borderColor: '#ddd' }}>
              <Text style={styles.srcTitle}>Note: Latest data is not available</Text>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({ indicators }) => {
  return {
    initiativeIndicatorByCountries: indicators.initiativeIndicatorByCountries,
    indicatorParentMap: indicators.indicatorParentMap
  }
}

const mapDispatchToProps = (dispatch) => ({

});

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  container: {
    padding: 5,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  scrollViewStyle: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
    borderRadius: 4,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerText: {
    fontFamily: Theme.customFont.fontBold,
    fontSize: 14,
    width: width - 60,
    color: '#202020'
  },
  headerYear: {
    backgroundColor: Theme.color.listEvenRowColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerYearText: {
    fontFamily: Theme.customFont.fontBold,
    fontSize: 13,
    width: width - 60,
    color: '#202020'
  },
  indicatorName: {
    fontSize: 13,
    fontFamily: Theme.customFont.fontMedium,
    color: '#303030',
    width: width - 155,
  },
  indicatorValue: {
    width: 130,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  indicatorText: {
    textAlign: 'right',
    fontFamily: Theme.customFont.fontMedium,
    fontSize: 13,
    alignSelf: 'center',
    color: '#303030',
  },
  srcTitle: {
    fontSize: 12,
    fontFamily: Theme.customFont.fontMediumItalic,
    paddingLeft: 15,
    marginTop: 15,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InitiativeIndicator);
