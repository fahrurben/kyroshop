import axios from 'axios'
import { API_URL } from '../helpers/constant.js'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useGetOrders(status = null, all=false) {
  return useQuery({
    queryKey: ['orders', status],
    queryFn: async () => {
      let url = `${API_URL}/orders`
      let params = {}

      if (all) {
        params["limit"] = 1000
      }
      if (status) {
        params["status"] = status
      }

      const paramString = new URLSearchParams(params);
      let response = await axios.get(url + '?' + paramString)
      return response.data
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