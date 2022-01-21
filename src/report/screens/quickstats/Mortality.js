import React, {PropTypes, Component} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import ChartWeb from '../../highcharts/index';
import Theme from '../../styles/Theme';
var { width, height } = Dimensions.get('window');
import SwitchSelector from "react-native-switch-selector";

const mapStateToProps = state => {
  return {
    mortality: state.quickStats.data.mortality,
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
          if (p.label.indexOf('-') != -1) {
            p.update({
              color: '#d87039'
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
        format: '{point.region_name} ({point.label})%',
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
class Morality extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Mortality Reduction'
  });

  constructor(props) {
    super(props);
    this.state = {
      options:[],
      years:null,
      regions:[]
    }
  }

  componentDidMount(){
    let {options} = this.state || {};
    let i = 0;
    for (const [key, value] of Object.entries(this.props.mortality.charts)) {
       options.push({label:key,value:key});
       if(i === 0 ){
         this.setState({...this.state, years:key, regions: value });
       }
       i++;
    }
 }

  render() {
    let { mortality } = this.props;
    let { charts } = mortality ? mortality : [];
    let { regions, years } = this.state || {};
    // preparing worldwide data and stored in worldWideObj
    let worldWideObj = mortality && mortality.hasOwnProperty("worldwide") ? { y: Number(mortality.worldwide.replace(/[^0-9\.]+/g, "")), region_name : 'Worldwide' } : null;
    let customizeMortality = regions.map((data) => {
      const { value, region_name } = data;
      let _value = Number(value.replace(/[^0-9\.]+/g, ""));
      return {
        y: _value,
        region_name: region_name,
        label: value.replace(/%/g, "")
      }
    });
    barChartConfig.series[0].data = customizeMortality;
    return (
      <View style={{flex:1}}>
        <View style={{flex:3}}>
        <ScrollView style={{ flex: 1 }}>
        <Text style={styles.txtStyle}>
          {`Reduction in malaria mortality rate, by WHO region, (${years})`}
        </Text>
        {
          barChartConfig.series[0].data && barChartConfig.series[0].data.length ?
            <ChartWeb
              originWhitelist={['']}
              style={{ width: '100%', height: height / 1.7 }}
              config={barChartConfig}
              options={options}
              stock={false} /> : <Text>{`No data found`}</Text>
        }
        <Text style={{paddingHorizontal: 15, fontFamily:Theme.customFont.fontItalic, fontSize: 12, marginTop: -10}}>Source: WHO estimates</Text>
        </ScrollView>
        </View>
        <View style={{flex:0.3, justifyContent:"center", marginLeft:8, marginRight:8}}>
          <SwitchSelector
            options={this.state.options}
            selectedColor={Theme.color.white}
            buttonColor={Theme.color.orange}
            initial={0}
            onPress={(value)=>{this.setState({...this.state, years:value, regions: charts[value]})}}
          /></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txtStyle: {
    color: '#202020',
    fontSize: 15,
    textAlign:'center',
    paddingTop: 15,
    paddingHorizontal: 15,
    fontFamily: Theme.customFont.fontSemiBold
  }
});

export default connect(mapStateToProps)(Morality);