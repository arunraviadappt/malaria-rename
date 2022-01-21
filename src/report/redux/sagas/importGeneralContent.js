import { Platform } from "react-native";
import { put, call } from 'redux-saga/effects';
import LocalStorage from '../../utils/dbAccess/localStorage';
import Types from '../actionTypes';
var RNFS = require('react-native-fs');

function* dispatchFailure(err) {
  yield put({ type: Types.IMPORT_NEWS_FAILURE, err });
}

function* responseHandler(data) {
  if (data && typeof data === 'object') {
    yield put({ type: Types.IMPORT_GENERAL_CONTENT, data })
  } else {
    yield call(dispatchFailure, res.err);
  }
}

function* importGeneralContent({ data }) {
  try {
    if (data) {
      yield call(responseHandler, data)
    } else {
      let fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/generalcontent.json`, 'utf8') : RNFS.readFileAssets('report/generalcontent.json', 'utf8');
      const generalContentJson = yield call(fileRead);
      if (generalContentJson) {
        let parsedData = JSON.parse(generalContentJson);
        yield call(responseHandler, parsedData);
      }
      return;
    }
  } catch (err) {
    yield call(dispatchFailure, err);
    return;
  }
}


export function* importGeneralContentFromLs() {
  return yield call(LocalStorage.getItem, ...['GeneralContent']);
}
export default importGeneralContent;
