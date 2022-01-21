import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChartWeb from '../../../highcharts';
import Theme from '../../../styles/Theme';
import HTML from 'react-native-render-html';

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
    itemMarginBottom: 10,
    labelFormatter: function () {
      return `${this.name} (${this.options.countryName})`
    }
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
export default class StackedBar extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: ''
  });
  render() {
    const { categoryData, stackedBarData, title } = this.props.route.params ? this.props.route.params : [];
    stackedBarConfig.xAxis.categories = categoryData;
    stackedBarConfig.series = stackedBarData;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <HTML
            {...DEFAULT_PROPS}
            baseFontStyle={styles.baseStyle}
            html={title}
          />
        </View>
        {/* <Text style={styles.titleStyle}>{`${title.replace(/[(]/g, '\n' + '(')}`}</Text> */}
        {Array.isArray(stackedBarConfig.series) && stackedBarConfig.series.length ?
          <ChartWeb
            originWhitelist={['']}
            style={{ width: '100%', height: 350 }}
            config={stackedBarConfig}
            options={options}
            stock={false} />
          : (<Text>No result found </Text>)
        }
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
    textAlign:'center'
  },
  txtStyle: {
    color: '#202020',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: Theme.customFont.fontSemiBold
  }
})
