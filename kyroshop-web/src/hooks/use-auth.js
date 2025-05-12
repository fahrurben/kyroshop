import { useSnapshot } from 'valtio/react'

import authStore, {
  authTokenExpiryKey,
  authTokenKey,
} from '../stores/auth-store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { API_URL } from '../helpers/constant.js'


export default function useAuth() {
  const { accessToken, isAuthenticated } = useSnapshot(authStore.state)
  const navigate = useNavigate()
  const { setToken, clearToken, setUser } = authStore.actions

  useEffect(() => {
    let authTokenExpiryEpoch = Number.parseInt(localStorage.getItem(authTokenExpiryKey))
    let authTokenExpiryTime = new Date(authTokenExpiryEpoch*1000);
    let now = new Date()
    if (now > authTokenExpiryTime) {
      clearToken()
      navigate('/login')
    }

    if (!accessToken) {
      let token = localStorage.getItem(authTokenKey)
      if (token) {
        setToken(token)
      } else {
        navigate('/login')
      }
    }

    axios.get(`${API_URL}/profile`).then(({ data: user }) => {
      setUser(user)
    })

  }, [])
}