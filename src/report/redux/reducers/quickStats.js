import { createReducer } from 'reduxsauce';
import Types from '../actionTypes';

export const INITIAL_STATE = {
  data: {}
}

export const fetchQuickStatsReceived = (state, action) => {
  return { ...state, data: action.data }
};

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_QUICK_STATS_SUCCESS]: fetchQuickStatsReceived,
  [Types.IMPORT_QUICK_STATS]: fetchQuickStatsReceived
});
