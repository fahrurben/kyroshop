import { useSnapshot } from 'valtio/react'

import authStore, {authTokenKey} from '../stores/auth-store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'


export default function useAuth() {
  const { accessToken, isAuthenticated } = useSnapshot(authStore.state)
  const navigate = useNavigate()
  const { setToken } = authStore.actions

  useEffect(() => {
    if (!accessToken) {
      let token = localStorage.getItem(authTokenKey)
      if (token) {
        setToken(token)
      } else {
        navigate('/login')
      }
    }
  }, [])
}