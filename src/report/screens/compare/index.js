import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get("window");
import Fontisto from "react-native-vector-icons/Fontisto";

export default class Compare extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: "Compare",
  });
  onNavigate = (route) => {
    navigation.navigate(route);
  };
  render() {
    return (
      <View style={styles.squareMenu}>
        <TouchableOpacity
          style={styles.squareMenuItemOne}
          onPress={() => this.onNavigate("CompareCountries")}
        >
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Fontisto
              color="#202020"
              name="map"
              color={"#7a7a7a"}
              size={width * 0.12}
            />
            <Text style={styles.title}>Compare Countries</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.squareMenuItemTwo}
          onPress={() => this.onNavigate("CompareInitiativeCountries")}
        >
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Fontisto
              color="#202020"
              name="file-1"
              color={"#7a7a7a"}
              size={width * 0.12}
            />
            <Text style={styles.title}>Compare Initiative countries</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  squareMenu: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    paddingTop: 30,
  },
  squareMenuItemOne: {
    flex: 1 / 2,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: "#AFD6D7",
  },
  squareMenuItemTwo: {
    flex: 1 / 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#7ac7cd",
  },
});
