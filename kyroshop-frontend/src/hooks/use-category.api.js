import axios from 'axios'
import { API_URL } from '../helpers/constant.js'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useGetCategory(search = "", all=false) {
  return useQuery({
    queryKey: ['categories', search],
    queryFn: async () => {
      let url = `${API_URL}/categories`

      let params = {}

      if (all) {
        params["limit"] = 1000
      }
      if (search) {
        params["search"] = search
      }

      const paramString = new URLSearchParams(params);
      let response = await axios.get(url + '?' + paramString)
      return response.data
    }
  })
}

export function useGetCategoryAll(all=false) {
  return useQuery({
    queryKey: ['categories_all'],
    queryFn: async () => {
      let url = `${API_URL}/categories`

      let params = {}

      if (all) {
        params["limit"] = 1000
      }

      const paramString = new URLSearchParams(params);
      let response = await axios.get(url + '?' + paramString)
      return response.data
    }
  })
}

export function useGetCategoryById(id) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      let url = `${API_URL}/categories/${id}`
      let response = await axios.get(url)
      return response.data
    },
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

export function useDeleteCategory({onSuccess, onError }) {
  return useMutation({
    mutationFn: ({ id }) => {
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