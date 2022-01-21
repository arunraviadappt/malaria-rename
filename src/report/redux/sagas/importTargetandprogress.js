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
    yield put({ type: Types.IMPORT_TARGETANDPROGRESS, data })
  } else {
    yield call(dispatchFailure, res.err);
  }
}

function* importTargetandprogress({ data }) {
  try {
    if (data) {
      yield call(responseHandler, data)
    } else {
      let fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/targets.json`, 'utf8') : RNFS.readFileAssets('report/targets.json', 'utf8');
      const targetAndprogressJson = yield call(fileRead);
      if (targetAndprogressJson) {
        let parsedData = JSON.parse(targetAndprogressJson);
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
  return yield call(LocalStorage.getItem, ...['targetandprogress']);
}
export default importTargetandprogress;
