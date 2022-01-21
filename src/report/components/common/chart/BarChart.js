import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChartWeb from '../../../highcharts';
import Theme from '../../../styles/Theme';
import HTML from 'react-native-render-html';
const chartColor = ['#747880', '#7ac7cd', '#4cb0e2', '#6289b3'];
const DEFAULT_PROPS = {
  tagsStyles: { i: { fontFamily: Theme.customFont.fontSemiBoldItalic, fontSize: 14 } }
};
// const themeColors = Object.values(Theme.color);
let dataLabels = {
  enabled: true,
  rotation: -90,
  color: '#FFFFFF',
  align: 'right',
  y: 10,
  style: { textOutline: 0 },
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
    return formatterfn(this.y);
  }
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

let barChartConfig = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
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
  plotOptions: {
    series: {
      pointPadding: 0,
      groupPadding: 0.1,
    }
  },
  legend: {
    enabled: true
  },
  tooltip: {
    // pointFormat: 'Death Rate: <b>{point.y}</b>'
    formatter: function () {
      let num = this.y;
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
      let label = "Value : <b>" + retvalue + "</b>";
      return label;
    }
  },
  // colors: [Theme.color.orange, Theme.color.appPrimaryColor, Theme.color.pink, Theme.color.listEvenRowColor],
  series: [{
    name: 'Regions',
    data: [],
    dataLabels: dataLabels
  }],

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom"
          }
        }
      }
    ]
  }
};

class BarChart extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: ''
  });

  render() {
    let { chartDataSet, title, isAllZero, countriesName, labels } = this.props.route.params ? this.props.route.params : []
    // barChartConfig.series[0].data = chartDataSet[0];
    barChartConfig.xAxis.categories = labels;
    barChartConfig.series = chartDataSet.map((chartData, index) => {
      return {
        name: countriesName[index],
        color: chartColor[index],
        data: chartData,
        dataLabels
      }
    });
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <HTML
            {...DEFAULT_PROPS}
            baseFontStyle={styles.baseStyle}
            html={title}
          />
        </View>
        {/* <Text style={styles.txtStyle}>{`${title}`}</Text> */}
        {/* {isAllZero ? <Text style={styles.txtStyle}>All values are zero </Text> : */}
        {/* // Array.isArray(barChartConfig.series[0].data) && barChartConfig.series[0].data.length ? */}
        <ChartWeb
          originWhitelist={['']}
          style={{ width: '100%', height: 350 }}
          config={barChartConfig}
          options={options}
          stock={false} />
        {/* // : <Text style={{ padding: 10 }}>No result found</Text>} */}
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
export default BarChart;
