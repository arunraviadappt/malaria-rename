import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import CountriesList from '../../components/compare/CountriesList';
import creator from "../../redux/actionCreators";
import Theme from '../../styles/Theme';
import DeviceInfo from 'react-native-device-info';
const isTablet = DeviceInfo.isTablet();

class CompareCountries extends Component {
  static navigationOptions = () => ({
    title: "Compare Countries"
  });

  constructor(props) {
    super(props);
    this.state = {
      selectedCountries: new Map(),
      limitSelect: 2,
      maxSelection: isTablet ? 4 : 2,
    };
  }

  onSelectCountry = (item) => {

    let { selectedCountries } = this.state;
    const newSelected = new Map(selectedCountries);

    if (selectedCountries.size < this.state.maxSelection && !selectedCountries.get(item.code)) {
      newSelected.set(item.code, { name: item.name['en'], code: item.code });
    } else {
      newSelected.delete(item.code);
    }
    this.setState({
      selectedCountries: newSelected
    });
  }

  renderCountryItem = (item, index) => {
    const isSelected = this.state.selectedCountries.get(item.code);
    return (
      <CountriesList
        index={index}
        item={item}
        isSelected={isSelected}
        onSelectCountry={this.onSelectCountry}
      />
    )
  }

  compareCountries = () => {
    if (this.state.selectedCountries.size <= this.state.maxSelection) {
      this.props.compareCountries(Array.from(new Map(this.state.selectedCountries).values()));
      this.props.navigation.navigate('CompareRegionIndicator')
    }
  }

  render() {
    const { countries } = this.props;
    const { selectedCountries, maxSelection } = this.state;

    return (
      <View style={styles.backgroundContainer}>
        <View style={{ backgroundColor: selectedCountries.size === maxSelection ? '#c43b5a' : '#666', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {
            !selectedCountries.size ?
              <Text style={{ color: '#fff', fontFamily: Theme.customFont.custFontNormal, paddingVertical: 10, flexWrap: 'wrap', textAlign: 'center' }}>Select maximum of {maxSelection} countries to compare</Text>
              :
              <Text style={{ color: '#fff', fontFamily: Theme.customFont.custFontNormal, paddingVertical: 10, flexWrap: 'wrap', textAlign: 'center' }}> {selectedCountries.size} of {maxSelection} country(s) selected</Text>
          }
        </View>
        <FlatList
          data={countries}
          renderItem={({ item, index }) => this.renderCountryItem(item, index)}
          keyExtractor={(item) => item.name['en']}
          onSelect={this.onSelect}
        />
        {(selectedCountries.size > 1) && !isTablet && (
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.compareCountries()} style={{ backgroundColor: Theme.color.orange, height: 40, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ color: '#fff', fontSize: 16, fontFamily: Theme.customFont.fontSemiBold }}>COMPARE</Text>
          </TouchableOpacity>
        )}
        {(selectedCountries.size > 1 && selectedCountries.size < 5) && isTablet && (
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.compareCountries()} style={{ backgroundColor: Theme.color.orange, height: 40, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ color: '#fff', fontSize: 16, fontFamily: Theme.customFont.fontSemiBold }}>COMPARE</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  }
});

const getCountriesFromRegions = (regions) => {
  let countries = [];
  regions.data.forEach((item) => countries = [...countries, ...item.countries]);
  return countries;
};

const mapStateToProps = ({ regions }) => {
  return {
    countries: regions.sortedCountriesList
  }
};

const mapDispatchToProps = (dispacth) => ({
  compareCountries: (countries) => dispacth(creator.compareCountriesByRegionIndicator(countries))
})

export default connect(mapStateToProps, mapDispatchToProps)(CompareCountries);
