import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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

const barChartConfig = {
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
      colorByPoint: true,
    }
  },
  legend: {
    enabled: false
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
  colors: [chartColor[0]],
  series: [{
    name: 'Regions',
    data: [],
    dataLabels: {
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

class RegionBarChart extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: route.params.countryName
  });

  render() {
    let { chartDataSet, title, isAllZero } = this.props.route.params ? this.props.route.params : []
    barChartConfig.series[0].data = chartDataSet[0];
    return (
      <View style={{ flex: 1 }}>
        {/* <Text style={styles.txtStyle}>{`${title}`}</Text> */}
        <View style={styles.titleContainer}>
          <HTML
            {...DEFAULT_PROPS}
            baseFontStyle={styles.baseStyle}
            html={title}
          />
        </View>
        {isAllZero ? (<View style={styles.body}>
                <Image source={require('../../assets/images/noData.jpg')} style={styles.feedBackImg} />
                <Text style={styles.message}>All values are zero</Text>
        </View>) :
          Array.isArray(barChartConfig.series[0].data) && barChartConfig.series[0].data.length ?
            <ChartWeb
              originWhitelist={['']}
              style={{ width: '100%', height: 350 }}
              config={barChartConfig}
              options={options}
              stock={false} /> :
              <View style={styles.body}>
                <Image source={require('../../assets/images/noData.jpg')} style={styles.feedBackImg} />
                <Text style={styles.message}>No Result Found</Text>
            </View>}
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
  },
  body: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    color: '#666',
    fontSize: 18,
    marginTop: 10,
    fontFamily: Theme.customFont.fontMedium,
    textAlign:'center',
    paddingHorizontal: 15
  },
  feedBackImg: {
    marginTop: -80,
    width: 250,
    height: 230,
  }
})
export default RegionBarChart;
