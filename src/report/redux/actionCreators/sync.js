
import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    startSync: ['data'],
    setSyncMessage: ['message', 'showSyncStatus', 'isFailureMsg']
})

export const syncTypes = Types
export default Creators
