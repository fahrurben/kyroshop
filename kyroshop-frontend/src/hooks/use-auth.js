import { useSnapshot } from 'valtio'
import { store as authStore } from '../stores/auth.store.js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function useAuth () {
  const { authExpiredAt } = useSnapshot(authStore)
  const navigate = useNavigate()

  useEffect(() => {
    let authTokenExpiryTime = new Date(authExpiredAt*1000);
    let now = new Date()
    if (now > authTokenExpiryTime) {
      navigate('/login')
    }
  }, [])
}