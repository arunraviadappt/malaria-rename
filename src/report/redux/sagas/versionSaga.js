import { Platform } from "react-native";
import { put, all, call } from 'redux-saga/effects'
import API from '../../constants';
import apiService from '../../utils/api/apiService';
import localStorage from '../../utils/dbAccess/localStorage';
import Types from '../actionTypes';
import DeviceInfo from 'react-native-device-info';
var RNFS = require('react-native-fs');

const deviceVersion = DeviceInfo.getVersion();
const deviceNumber = DeviceInfo.getBuildNumber();

export function* fetchVersion() {
  const { fetchApi } = apiService;
  return yield call(fetchApi, ...[API.VERSION, 20000]);
}

export function* importVersion() {
  // yield({types: Types.IMPORT_VERSION, })
}

export function* getVersionFromDb() {
  return yield call(localStorage.getVersion);
}

export function* updateVersion(versionJson) {
  yield call(localStorage.removeItem, `report-version`);
  if (!versionJson) {
    let fileRead = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/latestupdate.json`, 'utf8') : RNFS.readFileAssets(`report/latestupdate.json`, 'utf8');

    const version = yield call(fileRead);
    var versionJson = JSON.parse(version);
  }

  versionJson.device_number = deviceNumber;
  versionJson.device_version = deviceVersion;

  yield call(localStorage.saveVersion, ...[versionJson]);
  return versionJson;
}
