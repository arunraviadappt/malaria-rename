import React, { PropTypes, Component } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';
var Global = require('../../config/config');
var { width, height } = Dimensions.get('window');
import * as Progress from 'react-native-progress';
import Theme from '../../styles/Theme';


const mapStateToProps = state => {
  return {
    abbreviations: state.generalContent.data,
  }
};

class Abbreviations extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Abbreviations'
  });

  constructor(props) {
    super(props);
    this.state = {
      abbreviationData: []
    }
  }

  componentDidMount() {
    if (this.props.abbreviations !== undefined && this.props.abbreviations !== null) {
      const { abbreviations } = this.props.abbreviations
      let abbResp = Object.keys(abbreviations).map(function eachKey(key) {
        return { label: key, value: abbreviations[key] }
      });
      // console.log(abbResp);
      this.setState({ abbreviationData: abbResp })
    }
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.rowViewContainer} >
        <View style={styles.abbreviationsLeft}>
          <Text style={styles.abbLeft}>{item.label}</Text>
        </View>
        <View style={styles.abbreviationsRight}>
          <Text style={styles.abbText}>{item.value}</Text>
        </View>
      </View>
    )
  }

  render() {
    const { abbreviationData } = this.state;
    return (
      <View style={{ flex: 1 }}>

        {
          abbreviationData && abbreviationData.length ?
            <FlatList
              data={abbreviationData}
              renderItem={(item, index) => this.renderItem(item, index)}
              keyExtractor={item => item.label}
            /> :
            <View style={styles.error}>
              <Text style={styles.emptyText}>No Data Available</Text>
            </View>

        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowViewContainer: {
    flex: 1,
    borderBottomWidth: 1,
    padding: 10,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  abbreviationsLeft: {
    flex: 0.25
  },
  abbreviationsRight: {
    flex: 0.75
  },
  abbLeft: {
    fontSize: 16,
    color: Theme.color.orange,
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    fontFamily: Theme.customFont.fontRegular,
  },
  abbText: {
    fontSize: 16, fontFamily: Theme.customFont.fontRegular,
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: '#4a4a4a',
    fontSize: 18,
    padding: 5, fontFamily: Theme.customFont.fontRegular,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height
  },
  progressBar: {
    top: 2,
    position: 'absolute',
  },
});

export default connect(mapStateToProps)(Abbreviations);
