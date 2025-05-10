import axios from 'axios'
import { API_URL } from '../helpers/constant.js'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useGetCategory(all=false) {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      let url = `${API_URL}/categories`
      if (all) {
        url += '?limit=1000'
      }
      return axios.get(url)
    }
  })
}

export function useGetCategoryById(id) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => {
      let url = `${API_URL}/categories/${id}`
      return axios.get(url)
    },
    enabled: false,
  })
}

export function useCreateCategory({onSuccess, onError }) {
  return useMutation({
    mutationFn: (formData) => {
      let url = `${API_URL}/categories`
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

export function useUpdateCategory({ id = null, onSuccess, onError }) {
  return useMutation({
    mutationFn: (formData) => {
      let url = `${API_URL}/categories/${id}`
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

export function useDeleteCategory({ id = null, onSuccess, onError }) {
  return useMutation({
    mutationFn: (formData) => {
      let url = `${API_URL}/categories/${id}`
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