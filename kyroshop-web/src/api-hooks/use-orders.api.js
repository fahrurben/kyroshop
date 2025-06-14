import axios from 'axios'
import { API_URL } from '../helpers/constant.js'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useGetOrders(all=false) {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => {
      let url = `${API_URL}/orders`
      if (all) {
        url += '?limit=1000'
      }
      return axios.get(url)
    }
  })
}

export function useGetOrderById(id) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => {
      let url = `${API_URL}/orders/${id}`
      return axios.get(url)
    },
    enabled: false,
  })
}