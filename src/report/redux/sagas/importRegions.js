import { Platform } from "react-native";
import { put, call } from 'redux-saga/effects';
import LocalStorage from '../../utils/dbAccess/localStorage';
import Types from '../actionTypes';
var RNFS = require('react-native-fs');
import _ from 'lodash';

function* dispatchFailure(err) {
  yield put({ type: Types.IMPORT_REGIONS_FAILURE, err });
}

function* responseHandler(data) {
  if (data && typeof data === 'object') {
    yield put({ type: Types.IMPORT_REGIONS, data })
  } else {
    yield call(dispatchFailure, res.err);
  }
}

function* sortCountries(data) {
  let compareCountriesList = [];
  data.map((item, idx) => {
    return item.countries.map((regionCountries, index) => {
      return compareCountriesList.push(regionCountries);
    });
  })
  let sortedCountries = _.sortBy(compareCountriesList, [function (o) { return o.name.en }]);
  return sortedCountries;
}

function* importRegions({ data }) {
  try {
    if (data) {
      let countriesList = sortCountries(data);
      let sortCountriesList = countriesList.next().value
      let payload = {
        data,
        sortCountriesList
      }
      yield call(responseHandler, payload)
    } else {
      let fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/regions.json`, 'utf8') : RNFS.readFileAssets('report/regions.json', 'utf8');
      const regionsJson = yield call(fileRead);
      if (regionsJson) {
        let parsedData = JSON.parse(regionsJson);
        let countriesList = sortCountries(parsedData);
        let sortCountriesList = countriesList.next().value
        let payload = {
          data: parsedData,
          sortCountriesList
        }
        yield call(responseHandler, payload);
      }
      return;
    }
  } catch (err) {
    yield call(dispatchFailure, err);
    return;
  }
}

export function* importRegionsFromLs() {
  return yield call(LocalStorage.getItem, ...['regions']);
}
export default importRegions;
