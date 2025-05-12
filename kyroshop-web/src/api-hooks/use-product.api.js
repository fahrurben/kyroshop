import { useMutation, useQuery } from '@tanstack/react-query'
import { API_URL } from '../helpers/constant.js'
import axios from 'axios'

export function useGetProduct(all= true) {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => {
      let url = `${API_URL}/products`
      if (all) {
        url += '?limit=1000'
      }
      return axios.get(url)
    }
  })
}

export function useCreateProduct({onSuccess, onError }) {
  return useMutation({
    mutationFn: (formData) => {
      let url = `${API_URL}/products`
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