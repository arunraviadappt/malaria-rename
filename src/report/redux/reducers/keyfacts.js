import { createReducer } from 'reduxsauce';
import Types from '../actionTypes';

export const INITIAL_STATE = {
  data: []
}

export const fetchKeyFactsReceived = (state, action) => {
  return { ...state, data: action.data }
};

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_KEYFACTS_SUCCESS]: fetchKeyFactsReceived,
  [Types.IMPORT_KEYFACTS]: fetchKeyFactsReceived
});
