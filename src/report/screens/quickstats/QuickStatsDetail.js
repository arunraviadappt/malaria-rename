import React, {PropTypes, Component} from 'react';
import {View, Text, ListView, TouchableOpacity, StyleSheet,ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import Svg from "react-native-svg";
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryStack,
  VictoryCandlestick,
  VictoryErrorBar,
  VictoryBar,
  VictoryLine,
  VictoryArea,
  VictoryScatter,
  VictoryTooltip,
  VictoryZoomContainer,
  VictoryVoronoiContainer,
  VictorySelectionContainer,
  VictoryBrushContainer,
  VictoryCursorContainer,
  VictoryPie,
  VictoryLabel,
  VictoryLegend,
  createContainer
} from "victory-native";
const legendData = [{
  name: "Series 1",
  symbol: {
    type: "circle",
    fill: "green"
  }
}];
const Item = Picker.Item;
const legendStyle = { border: { stroke: "black" } };
import { VictoryTheme } from "victory-core";
const mapStateToProps = state => {
  return {
    regions : state.regions
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps);
}

class QuickStatsDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Malaria Cases and Death (2016) '
  });

  constructor(props) {
    super(props);
    this.state = {
      selected3:"key1",
      countries:[],
        region: '',
        country: '',
        year:'',
      data: [
        { name:"Malaria Cases",x: "", y: 91, color:"#3104B4" },
        {  name:"Deaths",x: "", y: 62, color:"#6E6E6E" }
      ]
    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <View style={styles.empty}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 25 }}
          scale={{ x: "time" }}
          animate={{
            duration: 2000,
            easing: "bounce"
          }}
          containerComponent={<VictoryZoomContainer zoomDimension="x" />}
        >
          <VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`} />
          <VictoryAxis dependentAxis />
          <VictoryCandlestick
            candleColors={{ positive: "#2E9AFE", negative: "#01DF74" }}
            data={[
              { x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0 },
              { x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5 },
              { x: new Date(2016, 6, 3), open: 15, close: 20, high: 22, low: 10 },
              { x: new Date(2016, 6, 4), open: 20, close: 10, high: 25, low: 7 },
              { x: new Date(2016, 6, 5), open: 10, close: 20, high: 15, low: 12 },
              { x: new Date(2016, 6, 6), open: 20, close: 40, high: 35, low: 0 },
              { x: new Date(2016, 6, 7), open: 6, close: 12, high: 11, low: 8 },
              { x: new Date(2016, 6, 8), open: 3, close: 6, high: 5, low: 4 },
              { x: new Date(2016, 6, 9), open: 20, close: 10, high: 25, low: 7 }
            ]}
          />
        </VictoryChart>
      </View>
    );
  }
  onValueChange(region,key,value){
    const newState = {};
    newState[value] = region;
  this.setState(newState);
if(value==='region'){
    this.props.regions.map((data, i) =>{
      if(data.name===region){
        this.setState({
          countries: data.countries,
          key: value
        })
      }

    })
  }

  }

}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    flexDirection:'column'

  },
  picker: {
      width: 250
    },
  emptyText: {
    color: '#4a4a4a',
    fontSize: 18,
    padding: 5
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10
  },
  titleText: {
      paddingTop: 10,
    fontSize: 20
  },
  detailreport: {
    fontSize: 16
  },
  itemBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5
  },
  rowInnerContainer: {
     height: 50,
    flexDirection:'row',
    justifyContent: 'center',
       alignItems: 'center',
         paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  iconContainer: {
     height: 50,
    alignItems: 'center',
  },
});


export default connect(
  mapStateToProps,
)(QuickStatsDetail);
