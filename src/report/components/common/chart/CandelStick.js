import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChartWeb from '../../../highcharts';
import Theme from '../../../styles/Theme';
const colors = ['#bfd1e6', '#82d886', '#fe9525', '#e9e5ca'];
const colorsValueMarker = ['#73a6e2', '#44c74a', '#c16400', '#bfaf42'];
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

const candelStickConfig = {
  title: {
    text: ''
  },

  xAxis: {
    type: 'year'
  },

  yAxis: {
    title: {
      text: null
    }
  },

  tooltip: {
    crosshairs: true,
    shared: true,
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
          if (index % 2 === 0) {
            pValue = formatterfn(point.y);
          } else {
            pValue = formatterfn(point.point.low) + ' - ' + formatterfn(point.point.high);
          }
          return '<br/>' + point.series.name + ': <b>' + pValue + '</b>';
        }) : []
      ));
    }
  },
  series: []
}

class CandelStick extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: ''
  });

  render() {
    const { title, data } = this.props.route.params ? this.props.route.params : []
    candelStickConfig.series = data.map((item, idx) => ({
      ...item,
      color: colors[idx],
      lineColor: colorsValueMarker[idx],
      marker: {
        ...item.marker,
        lineColor: colorsValueMarker[idx]
      }
    }));

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <HTML
            {...DEFAULT_PROPS}
            baseFontStyle={styles.baseStyle}
            html={title}
          />
        </View>
        {/* <Text style={{ color: '#202020', fontSize: 16, textAlign: 'center', paddingVertical: 15, paddingHorizontal: 20, fontFamily: Theme.customFont.fontSemiBold }}>{title.replace(/[(]/g, '\n' + '(')}</Text> */}
        {
          candelStickConfig.series[0].data.length && candelStickConfig.series[1].data.length ?
            <ChartWeb
              originWhitelist={['']}
              style={{ width: '100%', height: 350 }}
              config={candelStickConfig}
              options={options}
              stock={false} /> : <Text style={{ padding: 10 }}>No result found</Text>
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
export default CandelStick;
