import { takeLatest, all, fork, call } from 'redux-saga/effects';
import { networkSaga } from 'react-native-offline';

/* ------------- Types ------------- */
import Types from '../actionTypes';

/* ------------- Sagas ------------- */
// import fetchApi from './fetchSaga';
import syncContent from './sync';
import { fetchWatcher } from './fetchSaga';
import { indicatorsWatcher } from './importIndicators';
import { mapWatcher } from './map';
import { initiativeIndicatorsWatcher } from './importInitiativeIndicator';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    fork(networkSaga, { pingInterval: 20000 }),
    call(fetchWatcher),
    call(indicatorsWatcher),
    call(mapWatcher),
    call(initiativeIndicatorsWatcher),
    takeLatest(Types.START_SYNC, syncContent)
  ])
}
