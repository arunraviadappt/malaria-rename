import { Platform } from "react-native";
import localStorage from "../../utils/dbAccess/localStorage";
import { put, call, select, takeLatest } from 'redux-saga/effects';
import Types from '../actionTypes';
var RNFS = require('react-native-fs');

const colors = {
  colorCollection: ["#feffcc", "#fdff9e", "#9cff31", "#d8ecaa", "#89cd65", "#5dde18", "#38a800", "#54792b", "#266000"],
  policycolorselection: ["#e34c26", "#28a745"]
};

const initiativesColor = {
  colorCollection: ["#FFB2B2", "#FF7777", "#FF3B3B", "#FF0000"],
  policycolorselection: ["#004c26", "#00a745"]
};

export function* storeMapDatainLocalStorage(data) {
  yield call(localStorage.setItem, 'mapdata', data);
};

export function* getMapDataFromLocalStorage() {
  const data = yield call(localStorage.getItem, ...['mapdata']);
  if (data !== null) {
    return data;
  }
  const fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/mapdata.json`, 'utf8') : RNFS.readFileAssets('report/mapdata.json', 'utf8');
  const mapResp = yield call(fileRead);
  return JSON.parse(mapResp);
};

export function* storeInitiatveMapDatainLocalStorage(data) {
  yield call(localStorage.setItem, 'initiatives-mapdata', data);
};

export function* getInitiativeMapDataFromLocalStorage() {
  const data = yield call(localStorage.getItem, ...['initiatives-mapdata']);
  if (data !== null) {
    return data;
  }
  const fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/initiatives-mapdata.json`, 'utf8') : RNFS.readFileAssets('report/initiatives-mapdata.json', 'utf8');
  const mapResp = yield call(fileRead);
  return JSON.parse(mapResp);
};

/**
 * Data preparation for indicators screen maps
 */
function* generateMapDataWithDataElement(action) {
  try {
    const mapData = yield call(getMapDataFromLocalStorage);
    const { eid } = action.data;
    let legends = [];
    let colorCollection = colors.colorCollection;
    let policycolorselection = colors.policycolorselection;
    let values = {};
    Object.keys(mapData).forEach((y) => {
      values = mapData[y][eid];
      let lengendCount = Object.keys(values).length;
      let colorCollectionFinal = colorCollection.slice(colorCollection.length - lengendCount);
      Object.keys(values).forEach((k, idx) => {
        let dynamicolor = '';
        if (k === 'Yes') {
          dynamicolor = policycolorselection[1];
        } else if (k === 'No') {
          dynamicolor = policycolorselection[0];
        } else {
          dynamicolor = colorCollectionFinal[idx];
        }
        legends.push({
          name: k,
          color: dynamicolor
        });
      });
    });
    let NA_legend = {
      name: "NA",
      color: "#808080"
    };
    legends.push(NA_legend);
    yield put({ type: Types.SET_GENERATED_MAP_DATA, data: { legends, values } });
  } catch (err) {
    console.log('errrrr', err)
  }
};

/**
 * Data preparation for Initiatives chart
 */
function* generateInitiativeMapData() {
  const mapData = yield call(getInitiativeMapDataFromLocalStorage);
  let legends = [];
  let colorCollection = initiativesColor.colorCollection;
  let policycolorselection = initiativesColor.policycolorselection;
  let values = {};
  Object.keys(mapData).forEach((y) => {
    Object.keys(mapData[y]).map((eid) => {
      values = mapData[y][eid];
      let lengendCount = Object.keys(values).length;
      let colorCollectionFinal = colorCollection.slice(colorCollection.length - lengendCount);
      Object.keys(values).forEach((k, idx) => {
        let dynamicolor = '';
        if (k === 'Yes') {
          dynamicolor = policycolorselection[1];
        } else if (k === 'No') {
          dynamicolor = policycolorselection[0];
        } else {
          dynamicolor = colorCollectionFinal[idx];
        }
        legends.push({
          name: k,
          color: dynamicolor
        });
      });
    });
  });
  let NA_legend = {
    name: "NA",
    color: "#808080"
  };
  legends.push(NA_legend);
  yield put({ type: Types.SET_GENERATED_INITIATIVE_MAP_DATA, data: { legends, values } });
}

export function* mapWatcher() {
  yield takeLatest(Types.GENERATE_MAP_DATA_WITH_DATA_ELEMENT, generateMapDataWithDataElement);
  yield takeLatest(Types.GENERATE_INITIATIVE_MAP, generateInitiativeMapData)
};
