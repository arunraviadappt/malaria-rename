import { createReducer } from 'reduxsauce';
import Types from '../actionTypes';

export const INITIAL_STATE = {
  data: {}
}

export const fetchGeneralContentReceived = (state, action) => {
  return { ...state, data: action.data }
};

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_GENERAL_CONTENT_SUCCESS]: fetchGeneralContentReceived,
  [Types.IMPORT_GENERAL_CONTENT]: fetchGeneralContentReceived
});
