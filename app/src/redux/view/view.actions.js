import ViewActionTypes from './view.types'

export const setView = view => ({
    type: ViewActionTypes.SET_VIEW,
    payload: view
})