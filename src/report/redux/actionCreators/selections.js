
import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  enableMultiSelectCountries: ['data'],
  selectCountriesRegion: ['data']
})

export const selectionTypes = Types
export default Creators
