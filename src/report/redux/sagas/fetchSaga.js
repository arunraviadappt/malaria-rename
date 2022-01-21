import { put, all, call, select, delay, takeLatest } from 'redux-saga/effects';
import global from '../../constants';
import apiService from '../../utils/api/apiService';
import Types from '../actionTypes';
import { updateVersion } from './versionSaga';
import importGeneralContent from './importGeneralContent';
import importQuickStats from './importQuickStats';
import importNews from './importNews';
import importRegions from './importRegions';
import importInitiatives from './importInitiatives';
import importIndicators, { generateIndicatorsByCountries, generateIndicatorCountriesList, importDataElementsForIndicators } from './importIndicators';
import { generateInitiativeIndicatorByCountries, importDataElementsForInitiativeIndicators } from './importInitiativeIndicator';
import { setChartDataInLocal } from './charts';
import { storeMapDatainLocalStorage, storeInitiatveMapDatainLocalStorage } from './map';
import importKeyFacts from './importKeyFacts';
import importTargetandprogress from './importTargetandprogress'

function* fetchData() {
  const { fetchApi } = apiService;
  const languageCode = 'en';
  // yield put({ type: Types.FETCH_MENU_REQUEST });
  // yield put({ type: Types.FETCH_TAGS_REQUEST });
  // yield put({ type: Types.FETCH_SEARCH_REQUEST });
  // yield put({ type: Types.FETCH_LANGUAGE_REQUEST });
  // yield put({ type: Types.FETCH_REQUEST });

  try {
    const [
      news,
      chartData,
      initiatives,
      generalcontent,
      quickstats,
      regions,
      dataelements,
      mapData,
      indicators,
      initiativesDataElements,
      initiativesMapdata,
      keyFacts,
      targetAndprogress
    ] = yield all([
      call(fetchApi, ...[global.FETCH_NEWS_RECEIVED, 20000]),
      call(fetchApi, ...[global.FETCH_CHART_DATA_RECEIVED, 20000]),
      call(fetchApi, ...[global.FETCH_INITIATIVES_RECEIVED, 20000]),
      call(fetchApi, ...[global.FETCH_PAGECONTENT_RECEIVED, 20000]),
      call(fetchApi, ...[global.FETCH_QUICKSTATS_RECEIVED, 20000]),
      call(fetchApi, ...[global.FETCH_REGIONS_RECEIVED, 20000]),
      call(fetchApi, ...[global.GET_INDICATORS_BY_COUNTRIES_RECEIVED, 20000]),
      call(fetchApi, ...[global.GET_INDICATORS_BY_DATAELEMENTS_RECEIVED, 20000]),
      call(fetchApi, ...[global.GET_INDICATORS_RECEIVED, 20000]),
      call(fetchApi, ...[global.GET_INITIATIVES_INDICATORS_BY_COUNTRIES_RECEIVED, 20000]),
      call(fetchApi, ...[global.GET_INITIATIVES_INDICATORS_BY_DATAELEMENTS_RECEIVED, 20000]),
      call(fetchApi, ...[global.FETCH_KEYFACTS_RECEIVED, 20000]),
      call(fetchApi, ...[global.FETCH_TARGETANDPROGRESS_RECEIVED, 20000])
    ]);
    if (
      news && Array.isArray(news) &&
      chartData && typeof chartData === 'object' &&
      initiatives && Array.isArray(initiatives) &&
      generalcontent && typeof generalcontent === 'object' &&
      quickstats && typeof quickstats === 'object' &&
      regions && Array.isArray(regions) &&
      dataelements && typeof dataelements === 'object' &&
      mapData && typeof mapData === 'object' &&
      indicators && Array.isArray(indicators) &&
      initiativesDataElements && typeof initiativesDataElements === 'object' &&
      initiativesMapdata && typeof initiativesMapdata === 'object' &&
      keyFacts && typeof keyFacts === 'object' &&
      targetAndprogress && typeof targetAndprogress === 'object'
    ) {
      // yield put({ type: Types.FETCH_MENU_SUCCESS });
      // yield put({ type: Types.FETCH_TAGS_SUCCESS });
      // yield put({ type: Types.FETCH_SEARCH_SUCCESS });
      // yield put({ type: Types.FETCH_LANGUAGE_SUCCESS });

      const version = yield select(state => state.version);
      yield* importNews({ data: news });
      yield* storeMapDatainLocalStorage(mapData);
      yield* storeInitiatveMapDatainLocalStorage(initiativesMapdata);
      yield* setChartDataInLocal(chartData);
      yield* importGeneralContent({ data: generalcontent });
      yield* importQuickStats({ data: quickstats });
      yield* importRegions({ data: regions });
      yield* importInitiatives({ data: initiatives });
      yield* importIndicators({ data: indicators });
      yield* importDataElementsForIndicators({ data: dataelements });
      yield* importDataElementsForInitiativeIndicators({ data: initiativesDataElements }); 
      yield* generateIndicatorsByCountries(dataelements, chartData);
      yield* generateInitiativeIndicatorByCountries(initiativesDataElements, chartData);
      yield* generateIndicatorCountriesList({ data: mapData });
      yield* importKeyFacts({ data: keyFacts });
      yield* importTargetandprogress({ data: targetAndprogress });
      // yield* call(importMapData, { data: mapData });
      // yield* call(importInitiativesDataElements, { data: initiativesDataElements });
      // yield* call(importInitiativesMapdata, { data: initiativesMapdata });
      yield* updateVersion(version);

      yield put({ type: Types.SET_SYNC_MESSAGE, message: global.updateSuccess, showSyncStatus: true })
      yield delay(1000);
      yield put({ type: Types.SET_SYNC_MESSAGE, message: global.updateSuccess, showSyncStatus: false })

      // yield put({ type: Types.IMPORT_MENU_DATA, data: jsonNormalizedData });
      // yield put({ type: Types.IMPORT_TAGS_DATA, data: normalizedTagList });
      // yield put({ type: Types.IMPORT_SEARCH_DATA, data: search });
      // yield put({ type: Types.IMPORT_LANGUAGE_DATA, data: language });
      
    } else {
      // yield put({ type: Types.FETCH_MENU_FAILURE, error: 'Fetching Data failed' });
      // yield put({ type: Types.FETCH_TAGS_FAILURE, error: 'Fetching Data failed' });
      // yield put({ type: Types.FETCH_SEARCH_FAILURE, error: 'Fetching Data failed' });
      yield put({ type: Types.SET_SYNC_MESSAGE, message: global.serverIssue, showSyncStatus: true, isFailureMsg: true })
      yield delay(1000);
      yield put({ type: Types.SET_SYNC_MESSAGE, message: global.serverIssue, showSyncStatus: false, isFailureMsg: true })
    }
  } catch (error) {
    console.log('error ======> fetchData', error)
    yield put({ type: Types.FETCH_FAILURE, error });
    yield put({ type: Types.SET_SYNC_MESSAGE, message: global.serverIssue, showSyncStatus: true, isFailureMsg: true })
    yield delay(1000);
    yield put({ type: Types.SET_SYNC_MESSAGE, message: global.serverIssue, showSyncStatus: false, isFailureMsg: true })
  }
}

export function* fetchWatcher() {
  yield takeLatest(Types.FETCH_REQUEST, fetchData)
}
