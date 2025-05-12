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

export function useGetProductById(id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      let url = `${API_URL}/products/${id}`
      return axios.get(url)
    },
    enabled: false,
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

export function useUpdateProduct({ id = null, onSuccess, onError }) {
  return useMutation({
    mutationFn: (formData) => {
      let url = `${API_URL}/products/${id}`
      return axios.patch(url, formData)
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  })
}

export function useDeleteProduct({ id = null, onSuccess, onError }) {
  return useMutation({
    mutationFn: (formData) => {
      let url = `${API_URL}/products/${id}`
      return axios.delete(url)
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  })
}