import axios from 'axios'
import { API_URL } from '../helpers/constant.js'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useGetCustomer(all=false) {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => {
      let url = `${API_URL}/customers`
      if (all) {
        url += '?limit=1000'
      }
      return axios.get(url)
    }
  })
}

export function useGetCustomerById(id) {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => {
      let url = `${API_URL}/customers/${id}`
      return axios.get(url)
    },
    enabled: false,
  })
}