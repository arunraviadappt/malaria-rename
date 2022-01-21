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
    yield put({ type: Types.IMPORT_NEWS, data })
  } else {
    yield call(dispatchFailure, res.err);
  }
}

function* importNews({ data }) {
  try {
    if (data) {
      yield call(responseHandler, data)
    } else {
      let fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/news.json`, 'utf8') : RNFS.readFileAssets('report/news.json', 'utf8');
      const newsJson = yield call(fileRead);
      if (newsJson) {
        let parsedData = JSON.parse(newsJson);
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


export function* importNewsFromLs() {
  return yield call(LocalStorage.getItem, ...['news']);
}
export default importNews;
