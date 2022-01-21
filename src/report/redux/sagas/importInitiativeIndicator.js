import { Platform} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, call, select, takeLatest, all } from 'redux-saga/effects';
import LocalStorage from '../../utils/dbAccess/localStorage';
import Types from '../actionTypes';
import { getChartData } from "./importIndicators";
import _ from "lodash";
var RNFS = require('react-native-fs');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function* getInitiativeDataElement() {
  const data = yield call(LocalStorage.getItem, 'initiative-dataelement');
  if (data !== null) {
   return typeof data === 'string' ? JSON.parse(data) : data ;
  }
  const fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/initiatives-dataelements.json`, 'utf8') : RNFS.readFileAssets('report/initiatives-dataelements.json', 'utf8');
  const dataResp = yield call(fileRead);
  return JSON.parse(dataResp);
}

export function* importDataElementsForInitiativeIndicators({ data }) {
  try {
    if (data) {
      // yield call(generateInitiativeIndicatorByCountries, data);
      yield call(LocalStorage.setItem, 'initiative-dataelement', data);
    } else {
      let fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/initiatives-dataelements.json`, 'utf8') : RNFS.readFileAssets('report/initiatives-dataelements.json', 'utf8');
      const dataElementsJson = yield call(fileRead);
      if (dataElementsJson) {
        yield call(LocalStorage.setItem, 'initiative-dataelement', dataElementsJson);
        let parsedData = JSON.parse(dataElementsJson);
        yield call(generateInitiativeIndicatorByCountries, parsedData);
      }
      return;
    }
  } catch (err) {
    // yield call(dispatchFailure, err);
    console.log('err', err);
  }
}

export function* generateInitiativeIndicatorByCountries(data, chartJson) {
  const chartData = yield* getChartData(chartJson);
  // console.log('InitiveIndicatorSaga >>> data >>> ', data);
  let { indicatorParentMap, indicatorChildMap } = yield select(state => state.indicators);
  // console.log('InitiveIndicatorSaga >>>', indicatorChildMap);
  let language = 'en';
  let l_year = null;
  let monthDataPresent = [];
  let initiativeIndicatorByCountries = {};
  if (indicatorChildMap !== undefined) {
    Object.keys(data).forEach((c) => {
      initiativeIndicatorByCountries[c] = {}
      if (data[c] !== undefined) {
        Object.keys(data[c]).forEach((y) => {
          initiativeIndicatorByCountries[c][y] = {};// initiativeIndicatorByCountries[SA][2019] = {}
          // yearArray.push(parseInt(year));
          Object.keys(data[c][y]).forEach((i,indexing) => { // i ==> indicator parent id
            let indicatorName = indicatorParentMap[i];
            initiativeIndicatorByCountries[c][y][indicatorName] = [];
            Object.keys(data[c][y][i]).forEach((e) => {
              // console.log(`code >>> ${c} / year >>> ${y} eeee >>> ${e}`);
              initiativeIndicatorByCountries[c][y][indicatorName] = initiativeIndicatorByCountries[c][y][indicatorName] || [];
              let nameData = indicatorChildMap[parseInt(e)];
              if (nameData !== undefined) {
                // preparation for initative latest month value
                const years = Object.keys(initiativeIndicatorByCountries[c]);
                let monthValues = data[c][y][i][e]['value'];
                if (
                  data[c][y][i][e]['hasMonth'] &&
                  years.length > 1 &&
                  years.indexOf(y) === 1
                ) {
                  monthValues = [];
                  for (let m = 0; m < 12; m++) {
                    if (
                      data[c][y][i][e] &&
                      data[c][y][i][e]['value'] &&
                      data[c][years[0]][i] &&
                      data[c][years[0]][i][e] &&
                      data[c][years[0]][i][e]['value'] &&
                      data[c][years[0]][i][e]['value'][m].length &&
                      !data[c][y][i][e]['value'][m]) {
                      let currentMonthValue = {
                        month: months[m],
                        value: `${data[c][years[0]][i][e]['value'][m]} \n Data for ${years[0]}`,
                        year : years[0]
                      }
                      monthValues = [currentMonthValue, ...monthValues];
                    } 
                    
                    else {
                      if (data[c][y][i][e]['value'][m]) {
                        monthValues.push({ month: months[m], value: data[c][y][i][e]['value'][m] });
                      }
                    }
                  }
                } else {
                  monthValues = data[c][y][i][e]['value'].map((v, idx) => ({
                    month: months[idx],
                    value: v,
                  }));
                }
                if(years[2]){
                  if(indicatorName === i){
                    let year = years[1];
                    const _index = _.findIndex(initiativeIndicatorByCountries[c][year][indicatorName], { id: e });
                    initiativeIndicatorByCountries[c][year][indicatorName][_index].value.push(monthValues);
                  }
                  else{
                    let year = years[1];
                    const _index = _.findIndex(initiativeIndicatorByCountries[c][year][indicatorName], { id: e });
                    initiativeIndicatorByCountries[c][year][indicatorName][_index].value.push(monthValues);
                  }
                }
                initiativeIndicatorByCountries[c][y][indicatorName].push({
                  id: e,
                  name: nameData[language],
                  value: [monthValues],
                  eid: data[c][y][i][e]['eid'],
                  chart: data[c][y][i][e]['chart'],
                  order: data[c][y][i][e]['order'],
                  p_value: data[c][y][i][e]['p_value'],
                  total: data[c][y][i][e]['total'],
                  hasMonth: data[c][y][i][e]['hasMonth'],
                  chartData: data[c][y][i][e]['eid'].map((eid) => ({
                    eid: eid,
                    chartName: chartData[c] && chartData[c][eid] ? chartData[c][eid][0] : [],
                    value: chartData[c] && chartData[c][eid] ? chartData[c][eid][1] : []
                  }))
                });
              }
            })
            initiativeIndicatorByCountries[c][y][indicatorName].sort((a, b) => {
              return a.order - b.order
            })
          })
        })
      }
    })
  }
  yield put({ type: Types.SET_INITIATIVE_INDICATOR_BY_COUNTRIES, data: initiativeIndicatorByCountries });
  return initiativeIndicatorByCountries;
}

function* compareCountriesByInitiativeIndicators(action) {
  try {
    let { indicatorChildMap, data } = yield select(state => state.indicators);
    let dataelement = yield* getInitiativeDataElement();
    let selectedCountries = action.selectedCountries;
    let isLatestYear = false;
    let year = '';
    if (indicatorChildMap !== undefined) {
      for (let country of selectedCountries) {
        const years = Object.keys(dataelement[country.code]);
        isLatestYear = false;
        year = years[0];
        // if (dataelement[country.code] && years.length > 1) {
        //   isLatestYear = true;
        //   year = years[1];
        //   break;
        // } else {
        //   isLatestYear = false;
        //   year = years[0];
        // }
      }

      const generatedData = yield all(Object.keys(data).map((indicatorKeyname) => {
        let indicatorValue = {};
        indicatorValue['indicator'] = indicatorKeyname;
        indicatorValue['elements'] = data[indicatorKeyname].map((element) => ({
          ...element,
          values: selectedCountries.map(({ name, code }) => {
            let elementValue = {};
            if (
              dataelement[code] &&
              dataelement[code][year] &&
              dataelement[code][year][element.indicatorid] &&
              dataelement[code][year][element.indicatorid][element.eid] &&
              dataelement[code][year][element.indicatorid][element.eid]) {
              elementValue = {
                ...dataelement[code][year][element.indicatorid][element.eid]
              }
            } else {
              if (isLatestYear) {
                elementValue['total'] = 'NA';
              } else {
                elementValue['p_value'] = 'NA';
              }
            }
            return {
              code,
              name,
              year,
              ...elementValue
            }
          })
        }))
        return indicatorValue
      }));
      const notAvailableFilteredData = generatedData.map(({ indicator, elements }) => {
        return {
          indicator,
          elements: elements.filter((e) => {
            let uniqueArray = removeDuplicates(e.values, isLatestYear ? "total" : "p_value");
            return uniqueArray.length > 0;
          })
        }
      });
      let prepData = notAvailableFilteredData.filter((v) => v.elements.length > 0);
      yield put({
        type: Types.SET_COMPARED_COUNTRIES_INITIATIVE_INDICATORS,
        payload: {
          year,
          isLatestYear,
          data: prepData,
          selectedCountries
        }
      });
    }
  } catch (err) {
    console.log('errrrrrrr', err)
  }
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

export function* initiativeIndicatorsWatcher() {
  yield takeLatest(Types.COMPARE_COUNTRIES_BY_INITIATIVE_INDICATOR, compareCountriesByInitiativeIndicators)
}