import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Accordion from 'react-native-collapsible/Accordion';
var { width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../../styles/Theme';
import Entypo from 'react-native-vector-icons/Entypo';
const chartColor = ['#747880', '#7ac7cd', '#4cb0e2', '#6289b3'];
import HTML from 'react-native-render-html';
import FeatherIcon from 'react-native-vector-icons/Feather';

class CompareIndicators extends Component {
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

  onDataElementSelected = (element, name) => {
    const { values, chart, enabled, eid } = element ? element : [];
    // console.log('element >> ', element);
    // let chartType = '';
    // if (enabled && chart) {
    //   chartType = chart;
    // } else if (values[0].chartData.length > 0) {
    //   chartType = values[0].chartData[0].chartName;
    // } else {
    //   values.forEach((e) => chartType = e.chart);
    // }

    let countryName = [];

    if(eid === 9992) {
      values.forEach((v) => {
        if (v.name && v.value && v.value !== 'NA') {
          countryName.push(v.name);
        }
      });
    }

    let data = [];
    switch (name) {
      case 'Line or Bar':
        let hasNoValuesAtAll;
        let labels = [];
        data = values.map(({ chartData }, idx) => {
          if (chartData && chartData.length) {
            return chartData.map(({ value }) => {
              if (value && value !== 'NA') {
                hasNoValuesAtAll = Object.values(value).every(item => item === 0);
                // if (idx) {
                labels = Object.keys(chartData[0].value);
                // console.log('after labels >>> ', labels);
                // }
                const chartVal = Object.values(value);
                return chartVal;
              }
              return [[]];
            })[0]
          }
          return [];
        });
        this.props.navigation.navigate('BarChart', {
          labels,
          chartDataSet: data,
          countriesName: values.map(item => item.name),
          title: element.name['en'],
          isAllZero: hasNoValuesAtAll
        });
        break;
      case 'Stacked bar':
        let stackbarYearData = [];
        let stackbarCustomizeData = [];
        values.forEach(({ code, chartData, name }) => {
          chartData.forEach(({ value }, idx) => {
            if (idx === 0) {
              stackbarYearData = Object.keys(value);
            }
            let elem = {
              name: (idx === 0 ? "Government Contribution" : "External Contribution"),
              data: Object.values(value),
              stack: code,
              countryName: name
            }
            stackbarCustomizeData.push({ ...elem, color: chartColor[stackbarCustomizeData.length] });
          })
        });
        this.props.navigation.navigate('StackedBar', {
          categoryData: stackbarYearData,
          stackedBarData: stackbarCustomizeData,
          title: element.name['en']
        });
        break;
      case 'Candel stick':
        let chartValue = [];
        values.forEach(({ chartData }) => chartData.forEach(({ value }) => chartValue.push(value)));
        if (chartValue.length > 1 && eid != 9992) {
          // CandleStick chart
          const currentYrs = Object.keys(chartValue[0]).map(Number);
          let areaChartData = [];
          let averageChartData = [];
          let _data = [];
          values.forEach(({ chartData, code, name }) => {
            areaChartData = [];
            averageChartData = [];
            if (!chartData.length) {
              return;
            }
            currentYrs.forEach((year) => {
              const value = chartData.length && chartData.map((item) => {
                return item.value[year]
              }).map(Number);
              let lowPoint = (value[1] ? value[1] : 0);
              let highPoint = (value[2] ? value[2] : 0);
              let midPoint = (value[0] ? value[0] : 0);
              areaChartData.push([year, lowPoint, highPoint]);
              averageChartData.push([year, midPoint]);
            });
            _data.push({
              name: name,
              data: averageChartData,
              dataType: 'Point',
              type: 'spline',
              lineColor: '#2a9b98',
              marker: {
                fillColor: 'white',
                lineWidth: 2,
                lineColor: '#2a9b98'
              }
            });
            _data.push({
              name: name,
              data: areaChartData,
              dataType: 'Lower - Upper',
              type: 'areasplinerange',
              lineWidth: 0,
              linkedTo: ':previous',
              color: '#2a9b98',
              fillOpacity: 0.3,
              zIndex: 0,
              marker: {
                enabled: false
              }
            });
          });
          this.props.navigation.navigate('CandelStick', {
            data: _data,
            title: element.name['en'],
            // countriesName: countryName
          });
        } else {
          // LineChart
          let lineChartData = chartValue ? chartValue : [];
          this.props.navigation.navigate('LineChart', { lineChartData, title: element.name['en'], countriesName: countryName });
        }
        break;
      default:
        break;
    }
  }

  checkForChartAvailablity = (ele) => {
    const originalArray = (ele && ele.values ? ele.values : []);
    let isChartNameMatchs = {
      isChartAvailable: false,
      name: ''
    };
    if (ele && ele.chart) {
      if (ele.chart == "" || ele.chart == "Yes/No - no chart") {
        return isChartNameMatchs
      }
      return {
        isChartAvailable: true,
        name: ele.chart
      };
    } else if (originalArray && originalArray.length > 0) {
      originalArray.forEach((e) => {
        if (e.chartData && e.chartData.length > 0) {
          e.chartData.forEach(({ chartName }) => {
            if (chartName == "" || chartName == "Yes/No - no chart") {
              return isChartNameMatchs;
            }
            isChartNameMatchs = {
              isChartAvailable: true,
              name: chartName
            };
            return;
          });
        }
      });
      return isChartNameMatchs;
    } else {
      return isChartNameMatchs;
    }
  };

  _renderContent = section => {
    const DEFAULT_PROPS = {
      tagsStyles: { i: { fontFamily: Theme.customFont.fontSemiBoldItalic, fontSize: 13 } }
    };

    return section.elements.map((ele, idx) => {
      let { isChartAvailable, name } = this.checkForChartAvailablity(ele);
      return (
        <View style={{ flexDirection: 'column', flex: 1 }} key={`region-indicator-container-${idx}`}>
          <TouchableOpacity onPress={() => { isChartAvailable ? this.onDataElementSelected(ele, name) : null }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <View style={{ alignItems: "flex-start", justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 8, width: width - 50 }}>
                <HTML
                  {...DEFAULT_PROPS}
                  baseFontStyle={{ fontSize: 13, fontFamily: Theme.customFont.fontSemiBold, color: '#595959', backgroundColor: 'transparent' }}
                  html={ele.name['en']}
                />
                {/* <Text numberOfLines={3} style={styles.indicatorName}>{ele.name['en']}</Text> */}
              </View>

              {isChartAvailable && (
                <View style={{ width: 18, height: 18, backgroundColor: (name === "Stacked bar" ? Theme.color.pink : Theme.color.orange), marginHorizontal: 5, alignItems: 'center', justifyContent: 'center', paddingTop: 2, borderRadius: 2 }}>
                  <Entypo color='#fff' size={12} name='bar-graph' />
                </View>
              )}
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F0F0' }}>
            {ele.values.map((item, idx) => {
              return (
                <View key={idx} style={styles.indicatorValue}>
                  <Text style={styles.indicatorText}>{`${item.value}`}</Text>
                </View>
              )
            })}
          </View>
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

const mapStateToProps = ({ regions }) => ({
  indicators: regions.comparedIndicators,
  countries: regions.selectedCountries
});

export default connect(mapStateToProps, {})(CompareIndicators);

