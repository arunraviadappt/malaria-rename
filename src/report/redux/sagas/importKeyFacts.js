import { Platform } from "react-native";
import { put, call } from 'redux-saga/effects';
import LocalStorage from '../../utils/dbAccess/localStorage';
import Types from '../actionTypes';
var RNFS = require('react-native-fs');

function* dispatchFailure(err) {
  yield put({ type: Types.IMPORT_NEWS_FAILURE, err });
}

function* responseHandler(data) {
  if (data && Array.isArray(data)) {
    yield put({ type: Types.IMPORT_KEYFACTS, data })
  } else {
    yield call(dispatchFailure, res.err);
  }
}

function* importKeyFacts({ data }) {
  try {
    if (data) {
      yield call(responseHandler, data)
    } else {
      let fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/keyfacts.json`, 'utf8') : RNFS.readFileAssets('report/keyfacts.json', 'utf8');
      const keyFactsJson = yield call(fileRead);
      if (keyFactsJson) {
        let parsedData = JSON.parse(keyFactsJson);
        yield call(responseHandler, parsedData);
        return;
      }
      return;
    }
  } catch (err) {
    yield call(dispatchFailure, err);
    return;
  }
}


export function* importKeyFactsFromLs() {
  return yield call(LocalStorage.getItem, ...['keyfacts']);
}
export default importKeyFacts;
