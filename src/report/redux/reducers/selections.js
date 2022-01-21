import { createReducer } from 'reduxsauce';
import Types from '../actionTypes';

export const INITIAL_STATE = {
  region: {
    selectedCountries: [],
    isSelectionEnabled: false
  }
}

export const selectCountries = (state, action) => {
  return {
    ...state,
    region: {
      ...state.region,
      selectedCountries: [...state.region.selectedCountries, action.data]
    }
  }
};

const enableMultiSelectCountries = (state, action) => {
  return {
    ...state,
    region: {
      ...state.region,
      isSelectionEnabled: action.data
    }
  }
}

export default createReducer(INITIAL_STATE, {
  [Types.SELECT_COUNTRIES_REGION]: selectCountries,
  [Types.ENABLE_MULTI_SELECT_COUNTRIES]: enableMultiSelectCountries
});
