import { useSnapshot } from 'valtio/react'

import authStore, {authTokenKey} from '../stores/authStore'
import { useEffect } from 'react'


export default function useAuth() {
  const { accessToken, isAuthenticated } = useSnapshot(authStore.state)

  useEffect(() => {
    if (!accessToken) {
      let token = localStorage.getItem(authTokenKey)
      if (token) {
        authStore.state.accessToken = token
        authStore.state.isAuthenticated = true
      }
    }
  }, [])
}