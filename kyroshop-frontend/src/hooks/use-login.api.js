import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { API_URL } from '../helpers/constant.js'

const useLogin = ({onError, onSuccess}) => {
  return useMutation({
    mutationFn: (formData) => {
      return axios.post(`${API_URL}/token`, formData)
    },
    onSuccess: (data) => {
      onSuccess?.(data)
    },
    onError: (err) => {
      onError?.(err)
    }
  })
}

export {
  useLogin
}