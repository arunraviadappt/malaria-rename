import React, { Component } from 'react';
import { Dimensions, View, Platform, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
const win = Dimensions.get('window');
var RNFS = require('react-native-fs');

class ChartWeb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      init: `<html>
                  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
                  <link rel="stylesheet" href="css/solid.min.css">
                  <link rel="stylesheet" href="css/fontawesome.min.css">
                  <style media="screen" type="text/css">
                  #container {
                      width:100%;
                      height:100%;
                      top:0;
                      left:0;
                      right:0;
                      bottom:0;
                      position:absolute;
                      user-select: none;
                      -webkit-user-select: none;
                  },
                  #credits {
                      enabled: false
                    }
                  </style>
                  
                  <head>
                  <script src='highcharts.js'></script>
                  <script src="highcharts-more.js"></script>
                  <script>
                  document.addEventListener("DOMContentLoaded", function(event) {
                      Highcharts.setOptions(${JSON.stringify(this.props.options)});
                      Highcharts.${this.props.stock ? 'stockChart' : 'chart'}('container', `, end: `);
                  });
                  </script>
              </head>
                  <body>
                      <div id="container">
                      </div>
                  </body>
              </html>`,
      Wlayout: {
        height: win.height,
        width: win.width
      }
    }
  }

  // used to resize on orientation of display
  // reRenderWebView(e) {
  //   console.log('eeeeee >>> ', e.nativeEvent.layout);
  //   this.setState({
  //     height: e.nativeEvent.layout.height,
  //     width: e.nativeEvent.layout.width,
  //   })
  // }

  render() {
    let config = JSON.stringify(this.props.config, function (key, value) {//create string of json but if it detects function it uses toString()
      return (typeof value === 'function') ? value.toString() : value;
    });


    config = JSON.parse(config)
    let concatHTML = `${this.state.init}${flattenObject(config)}${this.state.end}`;

    return (
      <View style={this.props.style}>
        <WebView
          style={styles.full}
          source={{ html: concatHTML, baseUrl: Platform.OS == 'ios' ? `file://${RNFS.MainBundlePath}/data/` : `file:///android_asset/data/` }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={true}
          {...this.props}
        />
      </View>
    );
  };
};

var flattenObject = function (obj, str = '{') {
  Object.keys(obj).forEach(function (key) {
    str += `${key}: ${flattenText(obj[key])}, `
  })
  return `${str.slice(0, str.length - 2)}}`
};

var flattenText = function (item, key) {
  var str = ''
  if (item && typeof item === 'object' && item.length == undefined) {
    str += flattenObject(item)
  } else if (item && typeof item === 'object' && item.length !== undefined) {
    str += '['
    item.forEach(function (k2) {
      str += `${flattenText(k2)}, `
    })
    if (item.length > 0) str = str.slice(0, str.length - 2)
    str += ']'
  } else if (typeof item === 'string' && item.slice(0, 8) === 'function') {
    str += `${item}`
  } else if (typeof item === 'string') {
    str += `\"${item.replace(/"/g, '\\"')}\"`
  } else {
    str += `${item}`
  }
  return str
};

var styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});

module.exports = ChartWeb;