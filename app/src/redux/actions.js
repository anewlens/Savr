/* Action Types */

export const SET_ACCOUNT = 'SET_ACCOUNT'
export const SET_VIEW = 'SET_VIEW'
export const SET_USER = 'SET_USER'
export const TOGGLE_LOGGEDIN = 'TOGGLE_LOGGEDIN'
export const TOGGLE_LOADING = 'TOGGLE_LOADING'

/* Action Creators */

 export const setAccount = account => {
     return {
         type: SET_ACCOUNT, 
         account
     }
 }

 export const setView = view => {
     return {
         type: SET_VIEW,
         view
     }
 }

 export const setUser = user => {
     return {
         type: SET_USER,
         user
     }
 }