import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Modal, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Accordion from 'react-native-collapsible/Accordion';
let { width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Theme from '../../styles/Theme';
import HTML from 'react-native-render-html';
import FeatherIcon from 'react-native-vector-icons/Feather';

const DEFAULT_PROPS = {
  tagsStyles: { i: { fontFamily: Theme.customFont.fontSemiBoldItalic, fontSize: 14 } }
};
class RegionsIndicator extends Component {
  static navigationOptions = ({ route }) => ({
    title: route.params.name.en
  });

  constructor(props) {
    super(props);
    this.state = {
      indicators: [],
      activeSections: [],
      isAllExpanded: false,
      expandedSections: [],
      isModalVisible: false,
      modalState: {
        title: "",
        countries: []
      }
    }
  }

  componentDidMount() {
    const { code } = this.props.route.params;
    const yearData = Object.keys(this.props.indicatorsByCountries[code]).map((year) => this.props.indicatorsByCountries[code][year]);
    const indicators = Object.keys(yearData[0]).map((indicatorName) => {
      return {
        indicatorGroupName: indicatorName,
        elements: yearData[0][indicatorName]
      }
    });
    const filterNoElement = indicators.filter((e) => e.elements.length > 0);
    this.setState({ indicators: filterNoElement });
  }

  setModalVisible(item) {
    this.setState({
      isModalVisible: true,
      modalState: item
    });
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

  onDataElementSelected = (element) => {
    const { chartData, chart, name } = element ? element : [];
    const { route: { params } } = this.props;
    let countryNameTitle = params && params.name ? params.name.en : '';
    switch (chart) {
      case 'Line or Bar':
        // All values are zero
        let hasNoValuesAtAll = Object.values(chartData[0].value).every(item => item === 0);
        let finalChartData = [];
        // preparing chart data set
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
      case 'Stacked bar':
        // console.log('Welcome to Stacked bar...!!!', element);
        let stackbarYearData = Object.keys(chartData[0].value);
        let stackbarCustomizeData = chartData.map((item, idx) => Object.values(item.value));
        // console.log('yyyyyyy', stackbarYearData, stackbarCustomizeData)
        this.props.navigation.navigate('RegionStackedBar', {
          categoryData: stackbarYearData,
          stackedBarData: stackbarCustomizeData,
          title: name,
          countryName: countryNameTitle
        });
        break;
      case 'Candel stick':
        if (chartData && chartData.length > 1) {
          const currentYrs = Object.keys(chartData[0].value).map(Number);
          let data = {};
          let areaChartData = [];
          let averageChartData = [];
          currentYrs.map((year) => {
            const value = chartData.map((item) => {
              return item.value[year]
            }).map(Number)
            areaChartData.push([year, value[1], value[2]]);
            averageChartData.push([year, value[0]])
          });
          this.props.navigation.navigate('RegionCandelStick', {
            range: areaChartData,
            average: averageChartData,
            title: name,
            countryName: countryNameTitle
          });
        } else {
          const data = Object.values(chartData[0].value).map(Number);
          this.props.navigation.navigate('RegionLineChart', { lineChartData: data, title: name, countryName: countryNameTitle });
        }
        break;
      default:
        break;
    }
  }

  _renderContent = section => {
    const DEFAULT_PROPS = {
      tagsStyles: { i: { fontFamily: Theme.customFont.fontMediumItalic, fontSize: 13 } }
    };
    return (
      section.elements.map((ele, idx) => {
        let isChartIcon = !(ele.chart == "" || ele.chart == "Yes/No - no chart")
        return (
          <TouchableOpacity key={`region-indicator-selected-${idx}`} activeOpacity={isChartIcon ? 0.2 : 1}
            onPress={() => { isChartIcon ? this.onDataElementSelected(ele) : null }}>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', flex: 1, backgroundColor: (idx % 2) === 0 ? '#fff' : '#f4f4f4', paddingVertical: 8, paddingLeft:5, alignItems: 'center' }} key={`region-indicator-container-${idx}`}>
              <View style={{ width: width - 170}}>
                <HTML
                  {...DEFAULT_PROPS}
                  baseFontStyle={{ fontSize: 13, fontFamily: Theme.customFont.fontMedium, color: '#303030' }}
                  html={ele.name}
                />
              </View>
              <View style={styles.indicatorValue}>
                <View style={{ flexDirection: 'column' }}>
                  {Array.isArray(ele.value) ? ele.value && ele.value.length > 0 && ele.value.map((e, index) => (
                    <TouchableOpacity key={index} onPress={() => this.setModalVisible({ title: e.name, countries: e.countries })}>
                      <Text numberOfLines={2} style={{ fontSize: 12, fontFamily: Theme.customFont.fontSemiBold, color: Theme.color.orange }}>
                        {`${e.name} (${e.countries.length})`}
                      </Text>
                    </TouchableOpacity>
                  ))
                    : (
                      <Text style={styles.indicatorText}>{`${ele.value}`}</Text>
                    )}
                </View>
                {isChartIcon && (
                  <View style={{ width: 18, height: 18, backgroundColor: ele.chart === "Stacked bar" ? Theme.color.pink : Theme.color.orange, marginLeft: 8, alignItems: 'center', justifyContent: 'center', paddingTop: 2, borderRadius: 2, }}>
                    <Entypo color='#fff' size={12} name='bar-graph' />
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )
      })
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  renderCountryList = ({ item, index }) => {
    return (
      <View style={{ backgroundColor: (index % 2) === 0 ? '#f5f5f5' : '#fff', flex: 1, paddingHorizontal: 15, paddingVertical: 8 }}>
        <Text style={{ fontFamily: Theme.customFont.fontMedium, color: '#303030', }}>{`${item}`}</Text>
      </View>
    )
  }

  render() {
    const { indicators, modalState } = this.state;
    return (
      <View style={styles.mainView}>
        {/* Its expanding accordion */}
        {/* <TouchableOpacity
          activeOpacity={0.7}
          style={{ paddingHorizontal: 13, paddingVertical: 6, alignSelf: 'flex-end' }}
          onPress={() => this.toggleAccordion()}>
          <FeatherIcon name={this.state.isAllExpanded ? 'minimize-2' : 'maximize-2'} size={20} color={Theme.color.orange} />
        </TouchableOpacity> */}

        <ScrollView>
          <Accordion
            underlayColor={'white'}
            sections={indicators}
            activeSections={this.state.activeSections}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isModalVisible}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ flex: 1, marginTop: 50, marginHorizontal: 10, marginBottom: 50, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden', paddingBottom: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10, borderBottomColor: '#ccc', borderBottomWidth: StyleSheet.hairlineWidth, alignItems: 'center' }}>
                  {/* <Text style={{ fontFamily: Theme.customFont.fontSemiBold, fontSize: 15, width: width - 80 }}>{`TitLe::: ${modalState.title}`}</Text> */}
                  <View style={{ flex: 0.8 }}>
                    <HTML
                      {...DEFAULT_PROPS}
                      baseFontStyle={{ fontFamily: Theme.customFont.fontSemiBold, fontSize: 15, width: width - 60 }}
                      html={modalState.title}
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ flex: 0.2, alignItems: 'flex-end', justifyContent: 'center' }}
                    onPress={() => this.setState({ isModalVisible: false })}>
                    <AntDesign name="closecircleo" color="#999" size={25} />
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={modalState.countries}
                  renderItem={(item, index) => this.renderCountryList(item, index)}
                  keyExtractor={country => country}
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
    margin: 5
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
    fontSize: 12,
  }
});


const mapStateToProps = ({ indicators }) => {
  return {
    indicatorsByCountries: indicators.indicatorsByCountries,
    indicatorParentMap: indicators.indicatorParentMap
  }
}

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(RegionsIndicator);

