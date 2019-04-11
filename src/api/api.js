import {axios} from '../axios/api.request'

export const getTableNames = () => {
  return axios.get(`/convert/tables`)
}

export const getOriginName = (tableIndex) => {
  return axios.get(`/convert/origin/${tableIndex}`)
}

export const getDrugCombPagination = (tableIndex, page, size) => {
  return axios.get(`/convert/origin/${tableIndex}/page`, {
    params: {
      page,
      size
    },
    retry: 1, // 设置超时重发
    retryDelay: 1000
  })
}

export const getDrugKVPagination = (tableIndex, page, size) => {
  return axios.get(`/convert/origin/${tableIndex}/drugKV`, {
    params: {
      page,
      size
    }
  })
}

export const getDrugKVByBlockId = (tableIndex, blockId) => {
  return axios.get(`/convert/origin/${tableIndex}/drugKV/${blockId}`)
}

export const getDrugKVDetailsByBlockId = (tableIndex, blockId) => {
  return axios.get(`/convert/origin/${tableIndex}/drugCombination/${blockId}`)
}
