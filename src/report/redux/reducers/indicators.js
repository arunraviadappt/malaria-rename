import { createReducer } from 'reduxsauce';
import Types from '../actionTypes';

export const INITIAL_STATE = {
  indicatorParentMap: {},
  indicatorChildMap: {},
  indicatorsByCountries: {},
  initiativeIndicatorByCountries: {},
  indicatorDataElementCountries: {},
  data: {}
}

export const fetchIndicatorsReceived = (state, action) => {
  return {
    ...state,
    indicatorParentMap: action.data.indicatorParentMap,
    indicatorChildMap: action.data.indicatorChildMap,
    data: action.data.data
  }
};

const setIndicatorsByCountries = (state, action) => {
  return {
    ...state,
    indicatorsByCountries: action.data
  }
}

const setInitiativeIndicatorByCountries = (state, action) => {
  // console.log('actionnnn  >>> ', action);
  return {
    ...state,
    initiativeIndicatorByCountries: action.data
  }
}

// set countries list in data element of Indicator menu
const setIndicatorDataElementCountries = (state, action) => {
  return {
    ...state,
    indicatorDataElementCountries: action.data
  }
}

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_INDICATORS_SUCCESS]: fetchIndicatorsReceived,
  [Types.IMPORT_INDICATORS]: fetchIndicatorsReceived,
  [Types.SET_INDICATORS_BY_COUNTRIES]: setIndicatorsByCountries,
  [Types.SET_INITIATIVE_INDICATOR_BY_COUNTRIES]: setInitiativeIndicatorByCountries,
  [Types.SET_INDICATOR_DATA_ELEMENT_COUNTRIES_LIST]: setIndicatorDataElementCountries
});
