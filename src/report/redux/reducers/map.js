import { createReducer } from 'reduxsauce';
import Types from '../actionTypes';

export const INITIAL_STATE = {
  data: {},
  legends: [],
  initiativeMap: {},
  initiativeLegends: []
}

export const setGeneratedMapData = (state, action) => {
  return { ...state, data: action.data.values, legends: action.data.legends }
};

export const setGeneratedInitiativeMapData = (state, action) => {
  return { ...state, initiativeMap: action.data.values, initiativeLegends: action.data.legends }
};


export default createReducer(INITIAL_STATE, {
  [Types.SET_GENERATED_MAP_DATA]: setGeneratedMapData,
  [Types.SET_GENERATED_INITIATIVE_MAP_DATA]: setGeneratedInitiativeMapData
});
