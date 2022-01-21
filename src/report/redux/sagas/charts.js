import { Platform} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { call } from 'redux-saga/effects';
import localStorage from "../../utils/dbAccess/localStorage";
var RNFS = require('react-native-fs');

export function* setChartDataInLocal(data) {
  yield call(localStorage.setItem, 'chartdata', data);
}

export function* getChartDataFromLocal() {
  try {
    const data = yield call(localStorage.getItem, 'chartdata');
    if (data !== null) {
      return data;
    }
    const fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/chartdata.json`, 'utf8') : RNFS.readFileAssets('report/chartdata.json', 'utf8');
    const chartResp = yield call(fileRead);
    return JSON.parse(chartResp);
  } catch (err) {
  }
}
