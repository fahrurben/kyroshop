import axios from 'axios'
import { API_URL } from '../helpers/constant.js'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useGetCategory(all=true) {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      let url = `${API_URL}/categories`
      if (all) {
        url += '&limit=1000'
      }
      return axios.get(`${API_URL}/categories`)
    }
  })
}

export function useSaveCategory({ id = null, onSuccess, onError }) {
  return useMutation({
    mutationFn: (formData) => {
      let url = `${API_URL}/categories`
      if (id) {
        url += `?id=${id}`
      }
      return axios.post(url, formData)
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  })
}