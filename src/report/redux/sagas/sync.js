import { Platform } from "react-native";
import { put, all, call, select, delay } from 'redux-saga/effects'
import Types from '../actionTypes';
import { fetchVersion, updateVersion } from './versionSaga';
// import importMenuData, { importMenuFromLs } from './importMenuSaga';
// import importTagsData, { importTagsFromLs } from './importTagsSaga';
// import importSearchData, { importSearchFromLs } from './importSearchSaga';
import importNews from './importNews'
import LocalStorage from '../../utils/dbAccess/localStorage';
import messages from "../../constants";
import importQuickStats from './importQuickStats';
import importGeneralContent from './importGeneralContent';
import importRegions from './importRegions';
import importInitiatives from './importInitiatives';
import importKeyFacts from './importKeyFacts';
import importTargetandprogress from './importTargetandprogress'
import importIndicators, { importDataElementsForIndicators, generateIndicatorsByCountries, generateIndicatorCountriesList } from './importIndicators';
import { importDataElementsForInitiativeIndicators, generateInitiativeIndicatorByCountries } from './importInitiativeIndicator';
var RNFS = require('react-native-fs');

function* syncContent() {

  const versionInfo = yield call(LocalStorage.getVersion);

  try {
    if (versionInfo !== null) {
      const network = yield select(state => state.network);
      if (network.isConnected) {
        /**
         * Online version check
         */
        yield put({ type: Types.SET_SYNC_MESSAGE, message: messages.checkingUpdate, showSyncStatus: true })

        let dbVersion = versionInfo;
        const serverVersion = yield call(fetchVersion)

        if (dbVersion.version !== serverVersion.lastUpdated) {
          yield all([
            put({ type: Types.IMPORT_VERSION, versionInfo: serverVersion }),
            put({ type: Types.SET_SYNC_MESSAGE, message: messages.fetchingUpdate, showSyncStatus: true }),
            put({ type: Types.FETCH_REQUEST })
          ])
        } else {
          /**
           * App is up-to-date
           */
          // console.log('>>>>>>>>>>>> no update availbale <<<<<<<<<<');
          yield put({ type: Types.SET_SYNC_MESSAGE, message: messages.noUpdate, showSyncStatus: true }),
            // call(importDataFromLocalStorage, languageCode)
            yield delay(1000);
          yield put({ type: Types.SET_SYNC_MESSAGE, message: messages.noUpdate, showSyncStatus: false })
        }

      } else {
        /**
         * App under offline state
         */
        // yield call(importDataFromLocalStorage, languageCode);
      }
    } else {
      /**
       * App's First time launch
       */
      // console.log('Initial Import');
      yield* importNews({ data: null });
      yield* importQuickStats({ data: null });
      yield* importGeneralContent({ data: null });
      yield* importRegions({ data: null });
      yield* importInitiatives({ data: null });
      yield* importIndicators({ data: null });
      yield* importDataElementsForIndicators({ data: null });
      yield* importDataElementsForInitiativeIndicators({ data: null });
      yield* importLocalJsonsForDataPreparation();
      yield* importKeyFacts({ data: null });
      yield* importTargetandprogress({ data: null });
      yield* updateVersion();

      yield put({ type: Types.START_SYNC });
    }
  } catch (err) {
    yield put({ type: Types.SET_SYNC_MESSAGE, message: messages.serverIssue, showSyncStatus: true, isFailureMsg: true })
    yield delay(1000);
    yield put({ type: Types.SET_SYNC_MESSAGE, message: messages.serverIssue, showSyncStatus: false, isFailureMsg: true })
  }
}

function* importLocalJsonsForDataPreparation() {
  let getDataelements = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/dataelements.json`, 'utf8') : RNFS.readFileAssets('report/dataelements.json', 'utf8');
  let getChartData = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/chartdata.json`, 'utf8') : RNFS.readFileAssets('report/chartdata.json', 'utf8');
  // let getInitiativesDataElements = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/initiatives-dataelements.json`, 'utf8') : RNFS.readFileAssets('report/initiatives-dataelements.json', 'utf8');
  let getMapData = () => Platform.OS == 'ios' ? RNFS.readFile(`${RNFS.MainBundlePath}/report/mapdata.json`, 'utf8') : RNFS.readFileAssets('report/mapdata.json', 'utf8');

  const [dataelements, chartData, mapData] = yield all([
    call(getDataelements),
    call(getChartData),
    // call(getInitiativesDataElements),
    call(getMapData),
  ]);

  yield* generateIndicatorsByCountries(JSON.parse(dataelements), JSON.parse(chartData));
  // yield* generateInitiativeIndicatorByCountries(JSON.parse(initiativesDataElements), JSON.parse(chartData));
  yield* generateIndicatorCountriesList({ data: JSON.parse(mapData) });
}
export default syncContent;
