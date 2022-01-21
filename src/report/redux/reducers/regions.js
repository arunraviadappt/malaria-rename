import { createReducer } from 'reduxsauce';
import Types from '../actionTypes';

export const INITIAL_STATE = {
  data: [],
  comparedIndicators: [],
  selectedCountries: [],
  sortedCountriesList: []
}

export const fetchRegionsReceived = (state, action) => {
  return { ...state, data: action.data.data, sortedCountriesList: action.data.sortCountriesList }
};

const setComparedCountriesIndicators = (state, action) => {
  return {
    ...state,
    comparedIndicators: action.data.data,
    selectedCountries: action.data.selectedCountries
  }
}

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_REGIONS_SUCCESS]: fetchRegionsReceived,
  [Types.IMPORT_REGIONS]: fetchRegionsReceived,
  [Types.SET_COMPARED_COUNTRIES_INDICATORS]: setComparedCountriesIndicators
});
