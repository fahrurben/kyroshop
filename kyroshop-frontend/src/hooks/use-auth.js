import { useSnapshot } from 'valtio'
import { store as authStore } from '../stores/auth.store.js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

export default function useAuth () {
  const { authExpiredAt, authToken } = useSnapshot(authStore)
  const navigate = useNavigate()

  useEffect(() => {
    let authTokenExpiryTime = new Date(authExpiredAt*1000)
    axios.defaults.headers.common["Authorization"] = "Bearer " + authToken
    let now = new Date()
    if (now > authTokenExpiryTime) {
      navigate('/login')
    }
  }, [])
}