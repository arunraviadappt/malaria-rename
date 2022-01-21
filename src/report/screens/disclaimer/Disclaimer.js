import React, { PropTypes, Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Linking, Alert, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { connect } from 'react-redux';
var Global = require('../../config/config');
var { width, height } = Dimensions.get('window');
import Theme from '../../styles/Theme';
import { RenderHtmlStyles } from '../../styles/RenderHtmlStyles';
const externalNotificationMsg = 'This is an external link. Do you want to leave WHO Malaria Toolkit App?';

const mapStateToProps = state => {
  return {
    disclaimer: state.generalContent.data,
  }
};

class Disclaimer extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Disclaimer'
  });

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
        {/* {this.props.isLoading === true ?
         <ActivityIndicator
           animating={true}
           color='#4c4c4c'
           size="large"
           style={{flex: 1,
             justifyContent: 'center',
             alignItems: 'center',
             height: height-80}} />
        : */}
        {this.props.disclaimer !== undefined&&this.props.disclaimer!==null ?
        <View style={styles.container}>
        <HTML
          {...DEFAULT_PROPS}
          html={this.props.disclaimer.disclaimer.replace(/(\n+|\r+)/gm, ' ')}
        />
        </View> :
         <View style={styles.error}>
           <Text style={styles.emptyText}>No Data Available</Text>
         </View>
        }
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
  container:{
    padding:15
  },
  p:{
    fontSize:16,

  },
  a:{
    textDecorationLine: "underline",fontFamily: Theme.customFont.fontRegular,
    color:'#008DC9'
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: '#4a4a4a',
    fontSize: 18,
    padding: 5
  },
  progressBar: {
    top: 2,
    position: 'absolute',
  },
});
export default connect(mapStateToProps)(Disclaimer);
