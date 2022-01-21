import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Platform, Dimensions } from 'react-native';
import Svg from "react-native-svg";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import ChartWeb from '../../highcharts/index';
import Theme from '../../styles/Theme';
var { width, height } = Dimensions.get('window');

const mapStateToProps = state => {
  return {
    death: state.quickStats.data.deaths,
    // isLoading: state.quickstats.isLoading,
    // errorMsg:state.quickstats.error
  }
};

const barChartConfig = {
  chart: {
   renderTo:'container',
    type: 'bar',
    marginRight: 30,
    events: {
      load: function () {
        Highcharts.each(this.series[0].points, function (p) {
          if (p.region_name === 'Worldwide') {
            p.update({
              color: '#04B486'
            });
          }
        });
      }
    }
  },
  title:{
    text:''
  },
  plotOptions: {
    bar: {
      stacking: 'normal',
      pointWidth: 20,
      dataLabels: {
        enabled: true,
        y: -20,
        style: {
          color: '#000',
          textOutline: false,
          fontSize: 13
        },
      },
      enableMouseTracking: false,
      borderWidth: 0
    }
  },

  legend: {
    enabled: false
  },

  yAxis: {
    visible: false,
    minPadding: 0,
    maxPadding: 0,
    max: 100,
    min: 0
  },

  xAxis: {
    visible: false
  },

  series: [
    {
      color: '#0084b4',
      data: [],
      dataLabels: {
        align: 'left',
        x: -5,
        format: '{point.region_name} {point.rawValue} ({point.y})%',
      }
    },
  ]
}
const options = {
	global: {
		useUTC: false
	},
	lang: {
		decimalPoint: '.',
		thousandsSep: '.'
	}
};
class Death extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Deaths'
  });

  constructor(props) {
    super(props);
  }

  render() {
    let { death } = this.props;
    let { regions, currentYear } = death ? death : [];
    let customizeDeath = regions.map((data) => {
      const { value, rawValue, region_name } = data;
      let _value = Number(value.replace(/[^0-9\.]+/g, ""));
      return {
        y : _value,
        rawValue: rawValue,
        region_name: region_name
    }
    });
    barChartConfig.series[0].data = customizeDeath;
    return (
      <View style={{flex: 1}}>
        <Text style={styles.txtStyle}>
          {`Estimated malaria death (${currentYear})`}
        </Text>
        {
          barChartConfig.series[0].data && barChartConfig.series[0].data.length ?
            <ChartWeb
              originWhitelist={['']}
              style={{ width: '100%', height: height / 1.6, marginTop: -7 }}
              config={barChartConfig}
              options={options}
              stock={false} />
            : <Text>{`No data found`}</Text>
        }
        <Text style={{paddingHorizontal: 15, fontFamily:Theme.customFont.fontItalic, fontSize: 12}}>Source: WHO estimates</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txtStyle: {
    color: '#202020',
    fontSize: 15,
    textAlign:'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontFamily: Theme.customFont.fontSemiBold
  }
});

export default connect(mapStateToProps)(Death);
