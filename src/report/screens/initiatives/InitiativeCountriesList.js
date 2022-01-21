import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
const languageCode = 'en'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../../styles/Theme';
import Flag from 'react-native-flags';
import _ from 'lodash';
import creator from "../../redux/actionCreators";

class InitiativeCountriesList extends Component {

  static navigationOptions = () => ({
    title: 'E2020'
  });

  constructor(props) {
    super(props);
    this.state = {
      initiativeCounties: [],
      toggleSort: false,
      filterEnabled: false
    }
  }
  componentDidMount() {
    let { initiativeCounties } = this.props.route.params;
    initiativeCounties = _.sortBy(initiativeCounties, [function (o) { return o.name.en; }]);
    this.setState({
      initiativeCounties
    });
  }

  onChangeOrder = async () => {
    const { initiativeCounties, toggleSort } = this.state;
    let countries = [];
    if (toggleSort) {
      countries = await initiativeCounties.sort((a, b) => a.weight - b.weight);
    } else {
      countries = await initiativeCounties.sort((a, b) => b.weight - a.weight);
    }
    this.setState({
      initiativeCounties: countries,
      toggleSort: !toggleSort,
      filterEnabled: true
    });
  };

  onSelectCountry = (item) => {
    const selectedCountryItem = {
      code: item.code,
      name: item.name[languageCode],
    };
    this.props.navigation.navigate('InitiativeIndicator', selectedCountryItem);
  };

  onNavigateMap = () => {
    this.props.generateInitiativeMap();
    this.props.navigation.navigate('Map', { isInitiative: true, title: 'Confirmed indigenous cases' });
  }

  renderItem = ({ item, index: idx }) => {
    return (
      <TouchableOpacity style={styles.rowContainer} onPress={() => this.onSelectCountry(item)} key={idx}>
        <View style={[styles.itemContainer, { backgroundColor: (idx % 2) === 0 ? '#fff' : '#f5f5f5' }]} key={idx}>
          <View style={{ flex: 1, }} key={`flag${idx}`}>
            {item.code != '' ? <Flag code={item.code} size={32} /> : null}
          </View>
          <View style={{ flex: 7, backgroundColor: 'transparent' }} key={`item${idx}`}>
            <Text key={idx} style={styles.item} numberOfLines={2} >{item.name[languageCode]}</Text>
          </View>
          <View style={{ flex: 0.6, alignItems: 'flex-end' }} key={`icon${idx}`}>
            <FontAwesomeIcons name="angle-right" size={18} style={styles.iconImg} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { toggleSort, initiativeCounties, filterEnabled } = this.state;
    const toggleIcon = (toggleSort ? "sort-descending" : "sort-ascending");
    return (
      <View style={{flex: 1}}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingLeft: 8, paddingVertical: 2, borderBottomColor: '#ddd', borderBottomWidth: StyleSheet.hairlineWidth }}>
          <TouchableOpacity onPress={this.onNavigateMap} style={{ paddingVertical: 5, paddingHorizontal: 13 }}>
            <MaterialCommunityIcons name={'map-marker-radius'} size={18} style={styles.iconImg} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onChangeOrder} style={{ paddingVertical: 5, paddingHorizontal: 13 }}>
            <MaterialCommunityIcons name={toggleIcon} size={18} style={styles.iconImg} />
          </TouchableOpacity>
        </View>
        {filterEnabled &&
          (<View style={{ paddingHorizontal: 20, paddingVertical: 8, backgroundColor: '#f9f9f9' }}>
            <Text style={{ fontFamily: Theme.customFont.fontMedium, color: '#303030', textAlign: 'center' }}>
              Sorted based on Confirmed indigenous cases ({toggleSort ? 'Descending' : 'Ascending'})
          </Text>
          </View>)}
        {(Array.isArray(initiativeCounties) && initiativeCounties.length > 0) && (

            <FlatList
              extraData={this.state}
              data={initiativeCounties}
              renderItem={this.renderItem}
              keyExtractor={item => item.code}
              removeClippedSubviews={false}
            />

        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  item: {
    paddingHorizontal: 5,
    color: '#303030',
    fontFamily: Theme.customFont.fontMedium
  },
  iconImg: {
    color: '#505050',
  },
  rowContainer: {
    width: '100%'
  }
});

const mapDispatchToProps = (dispatch) => ({
  generateInitiativeMap: () => dispatch(creator.generateInitiativeMap())
});

export default connect(null, mapDispatchToProps)(InitiativeCountriesList);
