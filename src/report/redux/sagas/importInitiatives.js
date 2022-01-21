import { Platform } from "react-native";
import { put, call } from 'redux-saga/effects';
import LocalStorage from '../../utils/dbAccess/localStorage';
import Types from '../actionTypes';
var RNFS = require('react-native-fs');

function* dispatchFailure(err) {
  yield put({ type: Types.IMPORT_INITIATIVES_FAILURE, err });
}

function* responseHandler(data) {
  if (data && typeof data === 'object') {
    yield put({ type: Types.IMPORT_INITIATIVES, data })
  } else {
    yield call(dispatchFailure, res.err);
  }
}

function* importInitiatives({ data }) {
  try {
    if (data) {
      yield call(responseHandler, data)
    } else {
      let fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/initiatives.json`, 'utf8') : RNFS.readFileAssets('report/initiatives.json', 'utf8');
      const initiativesJson = yield call(fileRead);
      // console.log('initiativesJson', initiativesJson)
      if (initiativesJson) {
        let parsedData = JSON.parse(initiativesJson);
        yield call(responseHandler, parsedData);
      }
      return;
    }
  } catch (err) {
    yield call(dispatchFailure, err);
    return;
  }
}

export function* importInitiativesFromLs() {
  return yield call(LocalStorage.getItem, ...['initiatives']);
}
export default importInitiatives;
