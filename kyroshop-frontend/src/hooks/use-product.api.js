import axios from 'axios'
import { API_URL } from '../helpers/constant.js'
import { useMutation, useQuery } from '@tanstack/react-query'
export function useGetProduct(search = "", all= true) {
  return useQuery({
    queryKey: ["products", search],
    queryFn: async () => {
      let url = `${API_URL}/products`
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

export function useDeleteProduct({onSuccess, onError }) {
  return useMutation({
    mutationFn: (formData) => {
      let url = `${API_URL}/products/${formData.id}`
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