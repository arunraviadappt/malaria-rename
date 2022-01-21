import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { versionReducer as version } from './version';
import { reducer as network } from 'react-native-offline';
import { syncReducer as synMessage } from './syncStatus';
import news from './news';
import quickStats from './quickStats';
import generalContent from "./generalContent";
import regions from "./regions";
import initiatives from "./initiatives";
import indicators from "./indicators";
import selections from "./selections";
import map from './map';
import keyfacts from './keyfacts';
import targetandprogress from './targetandprogress';

const appState = reduceReducers({ syncStatus: '', showSyncStatus: false, language: 'en' }, synMessage);
const reducers = combineReducers({
  version,
  news,
  quickStats,
  regions,
  generalContent,
  initiatives,
  indicators,
  network,
  appState,
  selections,
  map,
  keyfacts,
  targetandprogress
});

export default reducers;
