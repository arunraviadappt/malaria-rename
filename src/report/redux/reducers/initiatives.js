import { createReducer } from 'reduxsauce';
import Types from '../actionTypes';

export const INITIAL_STATE = {
  data: [],
  selectedCountries: [],
  comparedIndicators: [],
  year: '',
  isLatestYear: false
}

export const fetchInitiativesReceived = (state, action) => {
  return { ...state, data: action.data }
};

export const setComparedCountriesInitiativeIndicators = (state, action) => ({
  ...state,
  comparedIndicators: action.payload.data,
  selectedCountries: action.payload.selectedCountries,
  year: action.payload.year,
  isLatestYear: action.payload.isLatestYear
});

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_INITIATIVES_SUCCESS]: fetchInitiativesReceived,
  [Types.IMPORT_INITIATIVES]: fetchInitiativesReceived,
  [Types.SET_COMPARED_COUNTRIES_INITIATIVE_INDICATORS]: setComparedCountriesInitiativeIndicators
});
