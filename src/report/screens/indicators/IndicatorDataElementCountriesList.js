import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import Accordion from "react-native-collapsible/Accordion";
var { width, height } = Dimensions.get("window");
import IconSort from "react-native-vector-icons/MaterialCommunityIcons";
import Theme from "../../styles/Theme";
import Types from "../../redux/actionCreators";
import HTML from "react-native-render-html";
import DeviceInfo from "react-native-device-info";
const isTablet = DeviceInfo.isTablet();

class IndicatorDataElementCountriesList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Indicators",
  });

  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      isCountrySort: false,
      isCountryValue: false,
    };
  }

  componentDidMount() {
    const { indicatorDataElementCountries } = this.props;
    const { countriesListParam } = this.props.route.params;
    const { definition, name, eid } = countriesListParam
      ? countriesListParam
      : {};
    let countryData = indicatorDataElementCountries[eid];
    let sortCountries = _.sortBy(countryData, (data) => data.name);
    // countryData = _.orderBy(countryData, ['name'],['asc']);
    this.setState({
      countries: sortCountries,
    });
  }

  numberFormatter = (num) => {
    let retvalue = num;
    if (num >= 1000000000) {
      retvalue = (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    } else if (num >= 1000000) {
      retvalue = (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 1000) {
      retvalue = (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    } else if (num < 1 || num > 0) {
      retvalue = num / 1;
    } else {
      retvalue = num;
    }
    return retvalue;
  };

  onSortByCountry = () => {
    this.setState(
      { isCountrySort: !this.state.isCountrySort },
      this.countrySorting
    );
  };

  onSortByCountryValue = () => {
    this.setState(
      { isCountryValue: !this.state.isCountryValue },
      this.countryValueSorting
    );
  };

  countryValueSorting = () => {
    let sortCountries = _.sortBy(this.state.countries, (data) => data.value);
    if (this.state.isCountryValue) {
      this.setState({ countries: sortCountries.reverse() });
    } else {
      this.setState({ countries: sortCountries });
    }
  };

  countrySorting = () => {
    let sortCountries = _.sortBy(this.state.countries, (data) => data.name);
    if (this.state.isCountrySort) {
      this.setState({ countries: sortCountries.reverse() });
    } else {
      this.setState({ countries: sortCountries });
    }
  };

  generateMapDataAndNavigate = () => {
    const { countriesListParam } = this.props.route.params;
    const { name } = countriesListParam ? countriesListParam : {};
    this.props.generateMapData(countriesListParam);
    this.props.navigation.navigate("Map", {
      isInitiative: false,
      title: name.en,
    });
  };

  flatListHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{
            width: width - 105,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => this.onSortByCountry()}
        >
          <Text style={styles.header}>{`Country`}</Text>
          <IconSort
            name={
              this.state.isCountrySort ? "sort-descending" : "sort-ascending"
            }
            size={18}
            color={this.state.isCountrySort ? "#333" : "#333"}
            style={styles.sortIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 80,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          onPress={() => this.onSortByCountryValue()}
        >
          <Text style={styles.header}>{`Value`}</Text>
          <IconSort
            name={
              this.state.isCountryValue ? "sort-descending" : "sort-ascending"
            }
            size={20}
            color={this.state.isCountryValue ? "#333" : "#333"}
            style={styles.sortIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderItem = (item, index) => {
    const { name, value } = item;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 8,
          paddingHorizontal: 5,
          backgroundColor: index % 2 === 0 ? "#fff" : "#f4f4f4",
        }}
      >
        <View style={{ width: isTablet ? width - 325 : width - 135 }}>
          <Text style={styles.countryName}>{name ? name : ""}</Text>
        </View>
        <View style={{ width: isTablet ? 300 : 125 }}>
          <Text style={styles.item}>{this.numberFormatter(value)}</Text>
        </View>
      </View>
    );
  };

  render() {
    const { countries } = this.state;
    const { countriesListParam } = this.props.route.params;
    const { definition, name, eid, source, map } = countriesListParam
      ? countriesListParam
      : {};
    const DEFAULT_PROPS = {
      tagsStyles: {
        i: { fontFamily: Theme.customFont.fontBoldItalic, fontSize: 16 },
      },
    };
    const DEFAULT_PROPS_DESCRIPTION = {
      tagsStyles: {
        i: { fontFamily: Theme.customFont.fontMediumItalic, fontSize: 14 },
      },
    };
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            marginTop: 10,
            marginBottom: 5,
            paddingHorizontal: 15,
            alignItems: "center",
          }}
        >
          <HTML
            {...DEFAULT_PROPS}
            baseFontStyle={{
              fontSize: 16,
              fontFamily: Theme.customFont.fontBold,
              color: "#303030",
              textAlign: "center",
            }}
            html={name.en}
          />
        </View>
        {/* <Text style={styles.tileText}>{name.en}</Text> */}
        {definition ? (
          <View
            style={{
              marginBottom: 8,
              paddingHorizontal: 10,
              alignItems: "center",
            }}
          >
            {/* <Text style={styles.definitionStyle}>{definition}</Text> */}
            <HTML
              {...DEFAULT_PROPS_DESCRIPTION}
              baseFontStyle={{
                fontSize: 14,
                fontFamily: Theme.customFont.fontMedium,
                color: "#303030",
                textAlign: "center",
              }}
              html={definition}
            />
          </View>
        ) : null}
        {map && countries && countries.length > 1 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={this.generateMapDataAndNavigate}
              activeOpacity={0.7}
              style={styles.mapBtn}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: Theme.customFont.fontSemiBold,
                }}
              >
                MAP
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {countries && countries.length ? (
          <View style={{ flex: 1 }}>
            <FlatList
              data={countries}
              maxToRenderPerBatch={12}
              renderItem={({ item, index }) => this.renderItem(item, index)}
              keyExtractor={(item) => item.code}
              ListHeaderComponent={this.flatListHeader}
              stickyHeaderIndices={[0]}
            />
            {source !== null && source.length > 2 && (
              <View>
                <Text style={styles.sourceStyle}>{`Source: ${source}`}</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.body}>
            <Image
              source={require("../../assets/images/noCountries.jpg")}
              style={styles.feedBackImg}
            />
            <Text style={styles.message}>No Country Found</Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ indicators }) => {
  return {
    indicatorDataElementCountries: indicators.indicatorDataElementCountries,
  };
};

const mapDispatchToProps = (dispatch) => ({
  generateMapData: (dataElement) =>
    dispatch(Types.generateMapDataWithDataElement(dataElement)),
});

const styles = StyleSheet.create({
  tileText: {
    fontSize: 16,
    fontFamily: Theme.customFont.fontBold,
    color: "#303030",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 15,
  },
  definitionStyle: {
    fontSize: 14,
    fontFamily: Theme.customFont.fontMediumItalic,
    color: "#303030",
    textAlign: "center",
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  countryName: {
    paddingHorizontal: 5,
    color: "#303030",
    fontFamily: Theme.customFont.fontMedium,
  },
  item: {
    paddingHorizontal: 5,
    color: "#303030",
    fontFamily: Theme.customFont.fontSemiBold,
    textAlign: "right",
    fontSize: 13,
  },
  sourceStyle: {
    fontSize: 13,
    fontFamily: Theme.customFont.fontItalic,
    color: "#303030",
    padding: 5,
    marginLeft: 5,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Theme.color.listEvenRowColor,
    justifyContent: "space-between",
  },
  header: {
    fontFamily: Theme.customFont.fontBold,
    color: "#202020",
  },
  sortIcon: {
    paddingLeft: 8,
    backgroundColor: "transparent",
  },
  body: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    color: "#666",
    fontSize: 18,
    marginTop: 10,
    fontFamily: Theme.customFont.fontMedium,
    textAlign: "center",
    paddingHorizontal: 15,
  },
  feedBackImg: {
    marginTop: -40,
    width: 250,
    height: 250,
  },
  mapBtn: {
    marginBottom: 13,
    backgroundColor: "#1e787c",
    height: 38,
    width: 90,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: Theme.customFont.fontRegular,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndicatorDataElementCountriesList);
