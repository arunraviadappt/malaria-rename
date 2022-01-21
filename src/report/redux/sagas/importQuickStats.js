import { Platform } from "react-native";
import { put, call } from 'redux-saga/effects';
import LocalStorage from '../../utils/dbAccess/localStorage';
import Types from '../actionTypes';
var RNFS = require('react-native-fs');

function* dispatchFailure(err) {
  yield put({ type: Types.IMPORT_QUICKSTATS_FAILURE, err });
}

function* responseHandler(data) {
  if (data && typeof data === 'object') {
    yield put({ type: Types.IMPORT_QUICK_STATS, data })
  } else {
    yield call(dispatchFailure, res.err);
  }
}

function* importQuickStats({ data }) {
  try {
    if (data) {
      yield call(responseHandler, data)
    } else {
      let fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/quickstats.json`, 'utf8') : RNFS.readFileAssets('report/quickstats.json', 'utf8');
      const quickStatsJson = yield call(fileRead);
      // console.log('quickStatsJson', quickStatsJson)
      if (quickStatsJson) {
        let parsedData = JSON.parse(quickStatsJson);
        yield call(responseHandler, parsedData);
      }
      return;
    }
  } catch (err) {
    yield call(dispatchFailure, err);
    return;
  }
}

export function* importQuickStatsFromLs() {
  return yield call(LocalStorage.getItem, ...['quickstats']);
}
export default importQuickStats;
