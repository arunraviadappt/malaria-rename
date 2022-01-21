import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import creator from "../../redux/actionCreators";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Theme from '../../styles/Theme';
import Flag from 'react-native-flags';

const languageCode = 'en';

class Countries extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: route.params.abbreviation.en
  });

  constructor(props) {
    super(props);
    this.state = {
      selectedCountries: []
    }
  }

  onSelect = (item) => {
    const selectedItem = {
      code: item.code,
      name: item.name,
      region: this.props.route.params.abbreviation.en
    };
    if (this.props.isSelectionEnabled) {
      if (this.props.selectedCountries.findIndex(obj => obj.code === item.code) <= -1) {
        this.props.selectCountries(selectedItem);
      }
    } else {
      this.props.navigation.navigate('RegionsIndicator', selectedItem);
    }
  };

  renderItem({ item, index: idx }) {
    return (
      <TouchableOpacity style={styles.rowContainer} onPress={() => this.onSelect(item)} key={idx}>
        <View style={[styles.itemContainer, { backgroundColor: (idx % 2) === 0 ? '#fff' : '#f5f5f5' }]} key={idx}>
          <View style={{ flex: 1, }} key={`flag${idx}`}>
            {item.code != '' ? <Flag code={item.code} size={32} type={"flat"}/> : null}
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
    const { countries, abbreviation, name } = this.props.route.params;
    const regionCountry = {
      name: abbreviation,
      code: name[languageCode],
      weight: -1,
    };

    return (
      <View style={styles.mainView}>
        <ScrollView contentContainerStyle={styles.container}>
          {(Array.isArray(countries) && countries.length) && (
            <FlatList
              data={[regionCountry, ...countries]}
              renderItem={(item, index) => this.renderItem(item, index)}
              keyExtractor={item => item.name['en']}
              extraData={this.props.selectedCountries}
              onSelect={this.onSelect}
            />
          )}
        </ScrollView>
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
    paddingLeft: 5,
    paddingTop: 4,
    color: '#aaa',
  },
  rowContainer: {
    width: '100%'
  }
});


const mapStateToProps = ({ regions, selections }) => {
  // console.log('state===>',regions)
  return {
    regions: regions.data,
    isSelectionEnabled: selections.region.isSelectionEnabled,
    selectedCountries: selections.region.selectedCountries
  }
}

const mapDispatchToProps = (dispatch) => ({
  enableMultiSelectCountries: (data) => dispatch(creator.enableMultiSelectCountries(data)),
  selectCountries: (data) => dispatch(creator.selectCountriesRegion(data)),
  filterIndicators: (data) => dispatch(creator.filterIndicators(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
