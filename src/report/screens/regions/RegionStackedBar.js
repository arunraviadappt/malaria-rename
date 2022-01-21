import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import ChartWeb from '../../highcharts/index';
import Theme from '../../styles/Theme';
import HTML from 'react-native-render-html';
const chartColor = ['#747880', '#7ac7cd', '#4cb0e2', '#6289b3'];
const DEFAULT_PROPS = {
  tagsStyles: { i: { fontFamily: Theme.customFont.fontSemiBoldItalic, fontSize: 14 } }
};

const options = {
  global: {
    useUTC: false
  },
  lang: {
    decimalPoint: '.',
    thousandsSep: '.'
  }
};
const stackedBarConfig = {
  chart: {
    type: 'column'
  },
  title: {
    text: ''
  },
  xAxis: {
    type: 'category',
    labels: {
      rotation: -60
    }
  },
  colors: [chartColor[0], chartColor[1]],
  yAxis: {
    min: 0,
    title: {
      text: ''
    },
    labels: {
      formatter: function () {
        function formatterfn(num) {
          let retvalue = num;
          if (num >= 1000000000) {
            retvalue = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
          }
          else if (num >= 1000000) {
            retvalue = (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
          }
          else if (num >= 1000) {
            retvalue = (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
          }
          else if (num < 1 || num > 0) {
            retvalue = (num / 1);
          } else {
            retvalue = num;
          }
          return retvalue;
        }
        return formatterfn(this.value);
      }
    },
  },
  legend: {
    itemMarginBottom: 10
  },
  tooltip: {
    // crosshairs: true,
    shared: true,
    // headerFormat: '<b>{point.x}</b><br/>',
    // pointFormat: '{series.name}: {point.y}<br/>'
    formatter: function () {
      function formatterfn(num) {
        let retvalue = num;
        if (num >= 1000000000) {
          retvalue = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
        }
        else if (num >= 1000000) {
          retvalue = (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        else if (num >= 1000) {
          retvalue = (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        else if (num < 1 || num > 0) {
          retvalue = (num / 1);
        } else {
          retvalue = num;
        }
        return retvalue;
      }
      return (['<b>' + this.x + '</b>'].concat(
        this.points ? this.points.map(function (point, index) {
          var pValue = '';
          if (index === 0) {
            pValue = formatterfn(point.y);
          } else {
            pValue = formatterfn(point.y);;
          }
          return '<br/>' + point.series.name + ': <b>' + pValue + '</b>';
        }) : []
      ));
    }
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      dataLabels: {
        enabled: false
      }
    }
  },
  series: []
}
export default class RegionStackedBar extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: route.params.countryName
  });
  render() {
    const { categoryData, stackedBarData, title } = this.props.route.params ? this.props.route.params : [];
    stackedBarConfig.xAxis.categories = categoryData;
    let resp = stackedBarData.map((item, index) => {
      return { name: index === 0 ? "Government Contribution" : "External Contribution", data: item }
    })
    // console.log("resp", resp);
    stackedBarConfig.series = resp;
    return (
      <View style={{ flex: 1 }}>
        {/* <Text style={{ color: '#202020', fontSize: 16, textAlign: 'center', paddingVertical: 15, fontFamily: Theme.customFont.fontSemiBold }}>{title.replace(/[(]/g, '\n' + '(')}</Text> */}
        <View style={styles.titleContainer}>
          <HTML
            {...DEFAULT_PROPS}
            baseFontStyle={styles.baseStyle}
            html={title}
          />
        </View>
        {Array.isArray(stackedBarConfig.series) && stackedBarConfig.series.length ?
          <ChartWeb
            originWhitelist={['']}
            style={{ width: '100%', height: 350 }}
            config={stackedBarConfig}
            options={options}
            stock={false} /> : <Text>No result found </Text>}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  baseStyle: {
    fontSize: 15,
    fontFamily: Theme.customFont.fontMedium,
    color: '#303030',
    textAlign: 'center'
  },
  txtStyle: {
    color: '#202020',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: Theme.customFont.fontSemiBold
  }
})
