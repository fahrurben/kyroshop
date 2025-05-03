import {proxy} from 'valtio'
import axios from 'axios'

export const authTokenKey = 'authToken'

const initialState = {
  accessToken: null,
  isAuthenticated: false,
  hydrated: false,
}

const state = proxy({ ...initialState })

const actions = {
  setToken: (token) => {
    state.accessToken = token
    state.isAuthenticated = true
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  },

  clearToken: (token) => {
    state.accessToken = null
    state.isAuthenticated = false
    axios.defaults.headers.common["Authorization"] = null;
  },

  persistToken: (token) => {
    localStorage.setItem(authTokenKey, token)
  }

}

const authStore = {
  actions,
  initialState,
  state,
}

export default authStore