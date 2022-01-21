
import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  importMenuData: ['data'],
  importMenuFailure: [],

  importTagsData: ['data'],
  importTagsFailure: [],

  importSearchData: ['data'],
  importSearchFailure: [],

  importLanguageData: ['data'],
  importLanguageFailure: [],

  importVersion: ['versionInfo'],

  importContentFromAssets: ['data'],

  setIndicatorsByCountries: ['data'],
  compareCountriesByRegionIndicator: ['selectedCountries'],
  setComparedCountriesIndicators: ['data'],

  generateMapDataWithDataElement: ['data'],
  setGeneratedMapData: ['data'],
  generateInitiativeMap: [],
  setGeneratedInitiativeMapData: ['data'],

  compareCountriesByInitiativeIndicator: ['selectedCountries'],
  setComparedCountriesInitiativeIndicators: ['payload'],
});

export const importTypes = Types
export default Creators
