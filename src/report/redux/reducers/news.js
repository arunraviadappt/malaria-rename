import { createReducer } from 'reduxsauce';
import Types from '../actionTypes';

export const INITIAL_STATE = {
  data: []
}

export const fetchNewsReceived = (state, action) => {
  return { ...state, data: action.data }
};

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_NEWS_SUCCESS]: fetchNewsReceived,
  [Types.IMPORT_NEWS]: fetchNewsReceived
});
