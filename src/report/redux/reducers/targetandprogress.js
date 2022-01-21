import { createReducer } from 'reduxsauce';
import Types from '../actionTypes';

export const INITIAL_STATE = {
  data: []
}

export const fetchTargetandprogressReceived = (state, action) => {
  return { ...state, data: action.data }
};

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_TARGETANDPROGRESS_SUCCESS]: fetchTargetandprogressReceived,
  [Types.IMPORT_TARGETANDPROGRESS]: fetchTargetandprogressReceived
});
