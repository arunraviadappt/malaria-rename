import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, StatusBar, Platform, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');
const statusBar = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;
const tileHeight = ((height - 70 - statusBar) / 3); //(screen height  - header height ) / 3
const tileWidth = (width / 2);
import Theme from '../../styles/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

const images = {
  AFR: require('../../assets/images/regions/AFRO.png'),
  EMR: require('../../assets/images/regions/EMRO.png'),
  EUR: require('../../assets/images/regions/EURO.png'),
  AMR: require('../../assets/images/regions/PAHO.png'),
  SEAR: require('../../assets/images/regions/SEARO.png'),
  WPR: require('../../assets/images/regions/WPRO.png')
}

class RegionsList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Regions',
    headerRight: (
      <TouchableOpacity activeOpacity={0.8} style={{paddingHorizontal: 16, paddingVertical:12}} onPress={() => navigation.navigate('CompareCountries')}>
        <AntDesign color="#fff" name="retweet" size={24} />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      chartLoaded: false,
    }
  }

  onNavigate = (item) => this.props.navigation.navigate('RegionCountriesList', item);

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.renderItemContainer} onPress={() => this.onNavigate(item)} key={`region-country-list-${item.regionId['en']}`}>
        <View>
          <Image style={styles.backgroundImage} source={images[item.regionId['en']]} />
          <View style={styles.tileTextContainer}>
            <Text style={styles.tileText}>{item.regionId['en']}</Text>
            <Text style={styles.tileAbbr}>{item.abbreviation['en']}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { regions } = this.props;
    return (
      <View style={styles.regionContainer}>
        {(Array.isArray(regions) && regions.length) && (
          <FlatList
            data={regions}
            renderItem={this.renderItem}
            keyExtractor={item => item.name['en']}
            numColumns={2}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  regionContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    margin: 5
  },
  renderItemContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
    margin: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    alignItems: 'center',
    shadowColor: "#505050",
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: .25,
    shadowRadius: 5,
    elevation: 3,
  },
  backgroundImage: {
    resizeMode: 'contain',
    width: tileWidth - 25,
    height: (height === 812 || height === 896) ? tileHeight - 60 : tileHeight - 25,
  },
  tileTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'transparent',
  },
  tileText: {
    fontSize: 18,
    fontFamily: Theme.customFont.fontBold,
    color: '#303030',
    textAlign: 'center',
  },
  tileAbbr: {
    fontSize: 12,
    textAlign: 'center',
    color: '#404040',
    fontFamily: Theme.customFont.fontMedium
  },
});


const mapStateToProps = state => {
  return {
    regions: state.regions.data
  }
}

export default connect(
  mapStateToProps
)(RegionsList)
