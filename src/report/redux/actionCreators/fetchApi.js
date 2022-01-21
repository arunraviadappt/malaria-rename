import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchRequest: [],
  fetchSuccess: ['data'],
  fetchFailure: ['error'],
  
  fetchNewsSuccess: ['data'],
  fetchKeyFactsSuccess: ['data'],
  fetchTargetandprogressSucces: ['data'],
  fetchChartDataSuccess: ['data'],
  fetchInitiativesSuccess: ['data'],
  fetchGeneralcontentSuccess: ['data'],
  fetchQuickstatsSuccess: ['data'],
  fetchRegionsSuccess: ['data'],
  fetchDataelementsSuccess: ['data'],
  fetchMapDataSuccess: ['data'],
  fetchIndicatorsSuccess: ['data'],
  fetchInitiativesDataElementsSuccess: ['data'],
  fetchInitiativesMapdataSuccess: ['data'],

  importNews: ['data'],
  importKeyFacts: ['data'],
  importTargetandprogress: ['data'],
  importChartData: ['data'],
  importInitiatives: ['data'],
  importGeneralcontent: ['data'],
  importQuickstats: ['data'],
  importRegions: ['data'],
  importDataelements: ['data'],
  importMapData: ['data'],
  importIndicators: ['data'],
  importInitiativesDataElements: ['data'],
  importInitiativesMapdata: ['data'],
})

export const fetchTypes = Types
export default Creators