import React, { Component } from 'react';
import { Text, View, StatusBar, ScrollView, StyleSheet, Linking } from 'react-native';
import HTML from 'react-native-render-html';
import Theme from '../../styles/Theme';

class NewsDetails extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: route.params.title
  });

  render() {
    const { newsDetails } = this.props.route.params;
    return (
      <ScrollView style={styles.container}>
        {newsDetails && <HTML
          baseFontStyle={styles.htmlStyle}
          html={newsDetails}
          onLinkPress={(event, href) => {
            Linking.openURL(href)
          }}
        />}
        <View style={{height:50}} />
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    paddingVertical: 20
  },
  htmlStyle: {
    fontFamily: Theme.customFont.fontRegular,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 10,
    padding: 0,
    color: '#595959'
  }
})
export default NewsDetails;