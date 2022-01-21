import React, { PropTypes, Component } from 'react';
import { Alert, View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Linking, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { connect } from 'react-redux';
import Mailer from 'react-native-mail';
import Theme from '../../styles/Theme';
import { RenderHtmlStyles } from '../../styles/RenderHtmlStyles';
const externalNotificationMsg = 'This is an external link. Do you want to leave WHO Malaria Toolkit App?';

var { width, height } = Dimensions.get('window');
var Global = require('../../config/config');
const mapStateToProps = state => {

  return {
    about: state.generalContent.data,
  }
};

class About extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'About'
  });

  handleEmail = () => {
    Mailer.mail({
      subject: this.props.about.emailsubject,
      recipients: [this.props.about.supportemail],
      body: ' ',
      isHTML: true
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        {cancelable: true}
      )
    });
  };

  componentDidMount(){
  }

  onLinkPress = (href) => {
    Alert.alert(
      "Notification",
      externalNotificationMsg,
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        { text: 'Ok', onPress: () => Linking.openURL(href).catch((err) => console.log(`Error Occured: ${err.message}`)) },
      ],
      { cancelable: false }
    )
  }

  render() {
    const DEFAULT_PROPS = {
      tagsStyles: RenderHtmlStyles.CUSTOM_TAGSSTYLE,
      classesStyles: RenderHtmlStyles.CUSTOM_CLASSES,
      onLinkPress: (evt, href) => this.onLinkPress(href),
    };

    return (
      <View style={styles.mainView}>

        <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.rowContainer}>

              {(this.props.about !== undefined && this.props.about !== null) ?
                <View style={styles.container}>
                  <HTML
                    {...DEFAULT_PROPS}
                    baseFontStyle={{    fontFamily: Theme.customFont.fontRegular,
                      fontSize: 16,
                      lineHeight: 24,
                      marginTop: 10,
                      marginBottom: 10,
                      padding: 0,
                      color: '#595959'}}
                    html={this.props.about.about.replace(/(\n+|\r+)/gm, ' ')}
                  />
                  <View>
                    <TouchableOpacity onPress={() => Linking.openURL(`mailto:${this.props.about.supportemail}?subject=${this.props.about.emailsubject}`)}>
                      <Text style={{color:'#008DC9',paddingTop:5, fontFamily: Theme.customFont.fontRegular, fontSize: 16}}>{this.props.about.supportemail}</Text>
                    </TouchableOpacity>
                  </View>
                </View> :
                <View style={styles.error}>
                  <Text
                      style={styles.emptyText}>No Data Available</Text>
                </View>
          }
        </ScrollView>

          </View>
    );
  }
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    flexGrow : 1,
    marginTop: 5
  },
  scrollViewStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    padding: 15
  },
  p: {
    fontSize: 16,  fontFamily: Theme.customFont.fontRegular,

  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: '#4a4a4a',
    fontSize: 18,
    padding: 5,fontFamily: Theme.customFont.fontRegular,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height - 80
  },
  progressBar: {
    top: 2,
    position: 'absolute',
  },
});
export default connect(mapStateToProps)(About);
