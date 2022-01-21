import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Theme from '../styles/Theme';

const HomeTagsItem = ({ tags, onNavigate }) => {
  return (
    <View style={styles.tagsContainer}>
      {tags && tags.map((value, index) => {
        return (
          <TouchableOpacity key={index} activeOpacity={0.7}
            onPress={() => onNavigate(value)}>
            <View style={styles.textWrapper}>
              <Text style={styles.newsTags}>{value.name}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
};

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  textWrapper: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#29b5bb'
  },
  newsTags: {
    fontFamily: Theme.customFont.fontRegular,
    color: Theme.customColor.textColor,
    fontSize: 15
  }
});
export default HomeTagsItem;
