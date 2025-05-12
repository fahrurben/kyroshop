import {proxy} from 'valtio'
import axios from 'axios'

export const authTokenKey = 'authToken'
export const authTokenExpiryKey = 'authTokenExpiry'

const initialState = {
  accessToken: null,
  isAuthenticated: false,
  user: null,
  hydrated: false,
}

const state = proxy({ ...initialState })

const actions = {
  setToken: (token) => {
    state.accessToken = token
    state.isAuthenticated = true
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  },

  clearToken: () => {
    state.accessToken = null
    state.isAuthenticated = false
    axios.defaults.headers.common["Authorization"] = null;
  },

  persistToken: (token) => {
    let expiryTime= (new Date()).getTime() + 3600
    localStorage.setItem(authTokenKey, token)
    localStorage.setItem(authTokenExpiryKey, expiryTime.toString())
  },

  setUser: (user) => {
    state.user = user
  }

}

const authStore = {
  actions,
  initialState,
  state,
}

export default authStore