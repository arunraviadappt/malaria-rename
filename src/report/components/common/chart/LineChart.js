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

const lineChartConfig = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "spline"
  },
  title: {
    text: ''
  },

  subtitle: {
    text: ''
  },

  yAxis: {
    title: {
      text: ''
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

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      pointStart: 2010
    }
  },

  series: [{
    name: '',
    data: []
  }],

  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }
}
class LineChart extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: ''
  });

  render() {
    let { lineChartData, title, countriesName } = this.props.route.params ? this.props.route.params : []
    // lineChartConfig.series[0].data = lineChartData;
    let finalData = [];
    lineChartData.map((chartData, index) => {
      let customSeries = {
        data: []
      };
      Object.entries(chartData).map(([key, value]) => {
        customSeries.data.push(value);
      });
      customSeries.name = countriesName[index];
      finalData.push(customSeries);
    });
    lineChartConfig.series = finalData;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <HTML
            {...DEFAULT_PROPS}
            baseFontStyle={styles.baseStyle}
            html={title}
          />
        </View>
        {/* <Text style={{ color: '#202020', fontSize: 16, textAlign: 'center', paddingHorizontal: 20, paddingVertical: 15, fontFamily: Theme.customFont.fontSemiBold }}>{title.replace(/[(]/g, '\n' + '(')}</Text> */}
        {Array.isArray(lineChartConfig.series) && lineChartConfig.series.length ?
          <ChartWeb
            originWhitelist={['']}
            style={{ width: '100%', height: 350 }}
            config={lineChartConfig}
            options={options}
            stock={false} /> :
          <Text style={{ padding: 10 }}>No result found</Text>}
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
export default LineChart;
