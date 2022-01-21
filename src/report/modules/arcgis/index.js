import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import map_geometry from './map_geometry.json';
import disputed_areas from "./disputed_area.json";
var RNFS = require('react-native-fs');

const colors = {
  colorCollection: ["#feffcc", "#fdff9e", "#9cff31", "#d8ecaa", "#89cd65", "#5dde18", "#38a800", "#54792b", "#266000"],
  policycolorselection: ["#e34c26", "#28a745"]
};

class ArgisMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapHtmlData: `
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
          <link rel="stylesheet" href="main.css" />
          <script src="dojo.js"></script>
          <style>
            html,
            body,
            #viewDiv {
              padding: 0;
              margin: 0;
              height: 100%;
              width: 100%;
              background-color: #e1e9ff;
            }
          </style>

          <script>

          </script>
        </head>

        <body>
          <div id="viewDiv"></div>
        </body>

      </html>
      `
    }
  }


  render() {
    const injectJs = `(function() {
    require(["esri/Map", "esri/views/MapView", "esri/Graphic", "esri/layers/TileLayer"], function (
      Map,
      MapView,
      Graphic,
      TileLayer
    ) {
      var layer = new TileLayer({
        url: "https://tiles.arcgis.com/tiles/5T5nSi527N4F7luB/arcgis/rest/services/WHO_Basemap_Beta3/MapServer"
      });
      var map = new Map({
        layers: [layer]
      });


      var view = new MapView({
        center: [0, 35],
        container: "viewDiv",
        map: map,
        zoom: 1,
        ui: {
          components: [ "attribution" ]
        }
      });

      /***************************
       * Create a polygon graphic
       ***************************/
      let finalArray = [];
      const DEFAULT_COLOR = "#DDDDDD";
      const GRAY_COLOR = "#808080";
      const BLACK_COLOR = "#202020";
      const WHITE_COLOR = "#ececec";
      const BLUE_COLOR = "#e1e9ff";
      const DBLUE_COLOR = "#b1caff";
      var legends = ${JSON.stringify(this.props.legends)};
      var json = ${JSON.stringify(map_geometry)};
      var indicatorData = ${JSON.stringify(this.props.data)};
      var disputedAreas = ${JSON.stringify(disputed_areas)};

        if(indicatorData['Yes']){
          yesData = indicatorData['Yes'];
          noData = indicatorData['No'];
          // Create a polygon geometry
          yesData.forEach(val => {
            var polygon = {
              ...json[val[0]],
              type: "polygon", // autocasts as new Polygon()
              spatialReference: {}
            };

            // Create a symbol for rendering the graphic
            var fillSymbol = {
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: legends[1].color,
              outline: {
                color: [255, 255, 255],
                width: 1
              }
            };

            // Add the geometry and symbol to a new graphic
            var polygonGraphic = new Graphic({
              geometry: polygon,
              symbol: fillSymbol
            });
            finalArray.push(polygonGraphic);
          });

          noData.forEach(val => {
            var polygon = {
              ...json[val[0]],
              type: "polygon", // autocasts as new Polygon()
              spatialReference: {}
            };

            // Create a symbol for rendering the graphic
            var fillSymbol = {
              type: "simple-fill", // autocasts as new SimpleFillSymbol()
              color: legends[0].color,
              outline: {
                color: [255, 255, 255],
                width: 1
              }
            };

            // Add the geometry and symbol to a new graphic
            var polygonGraphic = new Graphic({
              geometry: polygon,
              symbol: fillSymbol
            });
            finalArray.push(polygonGraphic);
          });
        } else {
        // For other key values
            Object.keys(indicatorData).forEach(function (v, idx) {
              indicatorData[v].forEach(function (data) {
                var polygon = {
                  ...json[data[0]],
                  type: "polygon", // autocasts as new Polygon()
                  spatialReference: {}
                };
                // Create a symbol for rendering the graphic
                var fillSymbol = {
                  type: "simple-fill", // autocasts as new SimpleFillSymbol()
                  color: legends[idx].color,
                  outline: {
                    color: [255, 255, 255],
                    width: 1
                  }
                };

                // Add the geometry and symbol to a new graphic
                var polygonGraphic = new Graphic({
                  geometry: polygon,
                  symbol: fillSymbol
                });
                finalArray.push(polygonGraphic);
              });
            });
        }

        var disputedPolys = [];
        var disputedPointsCollection = Object.values(disputedAreas);
        var disputedPointsCollectionKeys = Object.keys(disputedAreas);
        disputedPointsCollection.forEach((val, key) => {
          var polygon = {};
          var fillSymbol = {};
          var lineSymbol = {};
          fillSymbol = {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [0,0,0,0],
            outline: {
                color: [0,0,0,0],
                width: 1
            }
          };

          if (val['rings'] && val['rings'].length > 0) {
            polygon = {
              rings: val['rings'],
              type: "polygon", // autocasts as new Polygon()
              spatialReference: {}
            };
            if (disputedPointsCollectionKeys[key].includes("Lakes")) {
              fillSymbol.color = BLUE_COLOR;
              fillSymbol.outline.color = DBLUE_COLOR;
            } else if (disputedPointsCollectionKeys[key].includes("Aksai")) {
              fillSymbol.outline.color = BLACK_COLOR;
              fillSymbol.color = GRAY_COLOR;
              fillSymbol.width = 3;
              fillSymbol.style = "backward-diagonal";
            } else {
              if (disputedPointsCollectionKeys[key].includes("Abheyi")) {
                lineSymbol = {
                  type: "simple-line",
                  style: "dot",
                  color: BLACK_COLOR,
                  width: 1
                }
                fillSymbol.outline = lineSymbol;
                fillSymbol.color = GRAY_COLOR;
              } else {
                if (disputedPointsCollectionKeys[key].includes("Westren Sahara")) {
                  fillSymbol.outline.color = BLACK_COLOR;
                } else {
                  lineSymbol = {
                    type: "simple-line",
                    style: "dash",
                    color: BLACK_COLOR,
                    width: 1
                  }
                  fillSymbol.outline = lineSymbol;
                  fillSymbol.color = GRAY_COLOR;
                }
              }
            }
            var polygonGraphic = new Graphic({
              geometry: polygon,
              symbol: fillSymbol
            });
          } else {
            polygon = {
              paths: val['paths'],
              type: "polyline", // autocasts as new Polygon()
              spatialReference: {}
            };
            if (disputedPointsCollectionKeys[key].includes("South_Sudan")) {
              lineSymbol = {
                type: "simple-line",
                style: "dash",
                color: BLACK_COLOR,
                width: 1
              }
              fillSymbol.outline = lineSymbol;
            } else if (disputedPointsCollectionKeys[key].includes("Sudan")) {
              lineSymbol = {
                type: "simple-line",
                style: "dot",
                color: BLACK_COLOR,
                width: 1
              }
              fillSymbol.outline = lineSymbol;
            } else if (disputedPointsCollectionKeys[key] === 'Wline2') {
              lineSymbol = {
                type: "simple-line",
                style: "dash",
                color: BLACK_COLOR,
                width: 1
              }
              fillSymbol.outline = lineSymbol;
            } else if (disputedPointsCollectionKeys[key].includes("Abheyi Border")) {
              lineSymbol = {
                type: "simple-line",
                style: "dot",
                color: WHITE_COLOR,
                width: 1
              }
              fillSymbol.outline = lineSymbol;
            } else {
              fillSymbol.outline.color = BLACK_COLOR;
            }

            // Add the geometry and symbol to a new graphic
            var polygonGraphic = new Graphic({
              geometry: polygon,
              symbol: fillSymbol
            });
          }
          disputedPolys.push(polygonGraphic);
        });

        // Add the graphics to the view's graphics layer
        view.graphics.addMany(finalArray);
        view.graphics.addMany(disputedPolys);

    });
  })();`
    return (

      <WebView
        originWhitelist={['*']}
        style={styles.full}
        source={{ html: this.state.mapHtmlData, baseUrl: Platform.OS == 'ios' ? `file://${RNFS.MainBundlePath}/data/` : `file:///android_asset/data/` }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={injectJs}
        scalesPageToFit={true}
        scrollEnabled={false}
        automaticallyAdjustContentInsets={true}
      />
    )
  }
}

var styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});

export default ArgisMap;
