import React, { Component } from 'react';
import { View, Image, FlatList, Dimensions, Text, StyleSheet, StatusBar, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');
const statusBar = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;
import Theme from '../../styles/Theme';

const tileHeight = ((height - 70 - statusBar) / 3); //(screen height  - header height ) / 3
const tileWidth = (width / 2);

const images = [
  require('../../assets/images/initiatives/10plus1.png'),
  require('../../assets/images/initiatives/E2020.png'),
];


class Initiatives extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Initiatives'
  });

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  navigateTo = (initiativesCountriesItem) => {
    let initiativeCounties = initiativesCountriesItem ? initiativesCountriesItem : [];
    this.props.navigation.navigate('InitiativeCountriesList', { initiativeCounties: initiativeCounties });
  }

  render() {
    const { initiatives } = this.props;
    // console.log('initailtives:===>', initiatives)
    const { name, countries } = initiatives ? initiatives : ''
    return (
      <View style={styles.InitiativeContainer}>
        <TouchableOpacity style={styles.initiativeView} onPress={() => this.navigateTo(countries)}>
          <Image style={styles.backgroundImage} source={images[1]} />
          <View style={styles.tileTextContainer}>
            <Text style={styles.tileText}>{`${name.en}`}</Text>
          </View>
        </TouchableOpacity>
      </View>

    )
  }
}
const styles = StyleSheet.create({
  InitiativeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    margin: 5,
    flexDirection:'row'
  },
  initiativeView: {
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
    width: tileWidth - 25,
    height: (height === 812 || height === 896) ? tileHeight - 60 : tileHeight - 25,
  },
  backgroundImage: {
    resizeMode: 'contain',
    width: tileWidth  - 25,
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
    initiatives: state.initiatives.data[0]
  }
}

export default connect(
  mapStateToProps
)(Initiatives)
