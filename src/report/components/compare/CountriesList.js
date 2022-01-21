import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
// import Flag from 'react-native-flags';
import Feather from 'react-native-vector-icons/Feather';
import Theme from '../../styles/Theme';

const CountriesList = ({ item, isSelected, index, onSelectCountry }) => {
  return (
    <TouchableOpacity onPress={() => onSelectCountry(item)}>
      <View style={[styles.itemContainer, {backgroundColor: isSelected ? Theme.color.listEvenRowColor : (index % 2 === 0) ? '#fff' : '#f7f7f7', borderBottomColor:isSelected ? '#fff' : '#eee'}]}>
        <View style={{ flex: 1}}>
          <Feather name={isSelected ? "check-circle" : "circle"} color={isSelected ? "#888" : "#ddd"} size={24} />
        </View>
        <View style={{ flex: 11 }}>
          <Text style={styles.item} numberOfLines={2}> {item.name['en']}  </Text>
        </View>
        {/* <View style={{ flex: 1 }}>
          <FontAwesomeIcons name="angle-right" size={22} style={styles.iconImg} />
        </View> */}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1
  },
  item: {
    paddingHorizontal: 5,
    color: '#303030',
    fontFamily: Theme.customFont.fontMedium
  },
  iconImg: {
    paddingLeft: 5,
    color: '#252525',
  },
})
export default CountriesList;
