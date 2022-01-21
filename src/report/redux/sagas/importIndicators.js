import { Platform} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, call, all, select, takeLatest } from 'redux-saga/effects';
import LocalStorage from '../../utils/dbAccess/localStorage';
import Types from '../actionTypes';
import { setChartDataInLocal, getChartDataFromLocal } from "./charts";
var RNFS = require('react-native-fs');

function* dispatchFailure(err) {
  yield put({ type: Types.IMPORT_INDICATORS_FAILURE, err });
}

function* responseHandler(data) {
  if (data && typeof data === 'object') {
    yield put({ type: Types.IMPORT_INDICATORS, data })
  } else {
    yield call(dispatchFailure, res.err);
  }
}

function* importIndicators({ data }) {
  try {
    if (data) {
      const preparedData = yield call(dataPreparation, data);

      yield call(responseHandler, preparedData);
    } else {
      let fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/indicators.json`, 'utf8') : RNFS.readFileAssets('report/indicators.json', 'utf8');
      const indicatorsJson = yield call(fileRead);
      if (indicatorsJson) {
        let parsedData = JSON.parse(indicatorsJson);
        const preparedData = yield call(dataPreparation, parsedData);
        yield call(responseHandler, preparedData);
      }
      return;
    }
  } catch (err) {
    yield call(dispatchFailure, err);
    return;
  }
}

function* dataPreparation(_data) {
  let language = 'en';
  let indicatorParentMap = {};
  let indicatorChildMap = {};
  let newState = {};
  _data.forEach((data) => {
    newState[data.name[language]] = [];
    indicatorParentMap[data.id] = data.name[language];
    data.dataelement.map((ele, j) => {
      indicatorChildMap[ele.eid] = { ...ele.name, order: ele.order ? ele.order : -1 };
      ele.indicatorid = data.id;
      // if (ele.enabled) {
      newState[data.name[language]].push(ele);
      // }
    })
  });
  return {
    indicatorParentMap,
    indicatorChildMap,
    data: newState
  }
}

export function* importIndicatorsFromLs() {
  return yield call(LocalStorage.getItem, ...['indicators']);
}

export function* importDataElementsForIndicators({ data }) {
  try {
    if (data) {
      yield call(generateIndicatorsByCountries, data);
      yield call(LocalStorage.setItem, 'region-dataelement', data);
      // yield call(responseHandler, preparedData);
    } else {
      let fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/dataelements.json`, 'utf8') : RNFS.readFileAssets('report/dataelements.json', 'utf8');
      const dataElementsJson = yield call(fileRead);
      if (dataElementsJson) {
        yield call(AsyncStorage.setItem, 'region-dataelement', dataElementsJson);
        let parsedData = JSON.parse(dataElementsJson);
        yield call(generateIndicatorsByCountries, parsedData);
      }
      return;
    }
  } catch (err) {
    yield call(dispatchFailure, err);
    return;
  }
}

function* getRegionsDataElement() {
  const data = yield call(LocalStorage.getItem, 'region-dataelement');
  if (data !== null) {
    return data;
  }
  const fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/dataelements.json`, 'utf8') : RNFS.readFileAssets('report/dataelements.json', 'utf8');
  const dataResp = yield call(fileRead);
  return JSON.parse(dataResp);
}

export function* getChartData(data) {
  try {
    if (!data) {
      let fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/chartdata.json`, 'utf8') : RNFS.readFileAssets('report/chartdata.json', 'utf8');
      const chartData = yield call(fileRead);
      if (chartData) {
        let parsedData = JSON.parse(chartData);
        // yield* setChartDataInLocal(parsedData);
        return parsedData;
      }
      return {};
    }
    return data;
  } catch (err) {
    yield call(dispatchFailure, err);
    return;
  }
}

// Used to prepare data for regions country indicators dataelement
export function* generateIndicatorsByCountries(data, chartJson) {
  const chartData = yield* getChartData(chartJson);
  let language = 'en';
  let { indicatorParentMap, indicatorChildMap } = yield select(state => state.indicators);
  let indicatorsByCountries = {};
  if (indicatorChildMap !== undefined) {
    Object.keys(data).forEach((c) => {
      indicatorsByCountries[c] = {};
      if (data[c] !== undefined) {
        Object.keys(data[c]).forEach((y) => {
          indicatorsByCountries[c][y] = {};
          year = y;
          Object.keys(data[c][y]).forEach((i) => {
            let indicatorName = indicatorParentMap[i];
            indicatorsByCountries[c][y][indicatorName] = [];
            Object.keys(data[c][y][i]).forEach((e) => {
              var nameData = indicatorChildMap[parseInt(e)];
              if (nameData !== undefined) {
                indicatorsByCountries[c][y][indicatorName].push({
                  name: nameData[language],
                  value: data[c][y][i][e] && data[c][y][i][e]['value'].toString() ? data[c][y][i][e]['value'] : 'NA',
                  eid: data[c][y][i][e]['eid'],
                  chart: data[c][y][i][e]['chart'],
                  order: data[c][y][i][e]['order'],
                  chartData: data[c][y][i][e]['eid'].map((eid) => ({
                    eid: eid,
                    chartName: chartData[c] && chartData[c][eid] ? chartData[c][eid][0] : [],
                    value: chartData[c] && chartData[c][eid] ? chartData[c][eid][1] : []
                  }))
                });
              }
            })
            indicatorsByCountries[c][y][indicatorName].sort((a, b) => {
              return a.order - b.order
            });
          })
        })
      }
    });
  }
  yield put({ type: Types.SET_INDICATORS_BY_COUNTRIES, data: indicatorsByCountries });
  return indicatorsByCountries;

}

export function* compareCountriesByRegionIndicators(action) {
  let chartData = yield* getChartDataFromLocal();
  let a = yield select(state => state.indicators);
  let { indicatorChildMap, data } = yield select(state => state.indicators);
  let dataelement = yield* getRegionsDataElement();
  let selectedCountries = action.selectedCountries;
  if (indicatorChildMap !== undefined) {
    const generatedData = yield all(Object.keys(data).map((indicatorKeyname) => {
      let indicatorValue = {}
      indicatorValue['indicator'] = indicatorKeyname;
      indicatorValue['elements'] = data[indicatorKeyname].map((element) => ({
        ...element,
        values: selectedCountries.map(({ name, code }) => ({
          code,
          name,
          ...Object.keys(dataelement[code]).map((year) => {
            if (dataelement[code][year][element.indicatorid] &&
              dataelement[code][year][element.indicatorid][element.eid] &&
              dataelement[code][year][element.indicatorid][element.eid]) {
              let chartArr = [];
              dataelement[code][year][element.indicatorid][element.eid]['eid'].forEach((eid) => {
                if (chartData[code] && chartData[code][eid]) {
                  chartArr.push({
                    eid: eid,
                    chartName: chartData[code] && chartData[code][eid] ? chartData[code][eid][0] : null,
                    value: chartData[code] && chartData[code][eid] ? chartData[code][eid][1] : null
                  });
                }
              });
              return {
                ...dataelement[code][year][element.indicatorid][element.eid],
                chartData: chartArr
              }
            } else {
              return {
                value: 'NA',
                chart: "",
                chartData: []
              }
            }
          })[0]
        }
        ))
      }))
      return indicatorValue
    }));

    const notAvailableFilteredData = generatedData.map(({ indicator, elements }) => {
      return {
        indicator,
        elements: elements.filter((e) => {
          let uniqueArray = removeDuplicates(e.values, "value");
          return uniqueArray.length > 0;
        })
      }
    });
    let prepData = notAvailableFilteredData.filter((v) => v.elements.length > 0);
    yield put({
      type: Types.SET_COMPARED_COUNTRIES_INDICATORS,
      data: {
        data: prepData,
        selectedCountries
      }
    });
  }
}

// generate country list for indicator menu
export function* generateIndicatorCountriesList(element) {
  // console.log('saga generateIndicatorCountriesList >>> ', element.data);
  const { data } = element ? element : {};
  let getCountriesByEid = {};
  Object.keys(data).forEach((year) => {
    let values = data[year];
    Object.keys(values).forEach((elementId) => {
      getCountriesByEid[elementId] = [];
      Object.keys(values[elementId]).forEach((rangeKey) => {
        values[elementId][rangeKey].forEach(countryValues => {
          getCountriesByEid[elementId].push({
            code: countryValues[0] ? countryValues[0] : '',
            name: countryValues[1] ? countryValues[1] : '',
            value: countryValues[2] ? countryValues[2] : ''
          })
        })
      });
    });
  })
  // console.log('countryList 228 >>>> ', getCountriesByEid, typeof getCountriesByEid);
  yield put({ type: Types.SET_INDICATOR_DATA_ELEMENT_COUNTRIES_LIST, data: getCountriesByEid });
  return getCountriesByEid;
}

function removeDuplicates(originalArray, prop) {
  let lookupObject = {};
  for (let i in originalArray) {
    if (originalArray[i][prop] === 'NA') {
      lookupObject[false] = 'NA';
    } else {
      lookupObject[true] = 'NA';
      break;
    }
  }
  if (lookupObject[true]) {
    return originalArray;
  }
  return [];
}

export default importIndicators;

export function* indicatorsWatcher() {
  yield takeLatest(Types.COMPARE_COUNTRIES_BY_REGION_INDICATOR, compareCountriesByRegionIndicators)
}
