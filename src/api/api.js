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

export const getDrugInfoByDrugName = name => {
  return axios.get(`/chemical/info/${name}`)
}

export const getDrugCombinationCellLine = (tableIndex, blockId) => {
  return new Promise((resolve, reject) => {
    getDrugKVDetailsByBlockId(tableIndex, blockId).then(data => {
      return data
    }).then(data => {
      resolve(axios.get(`/convert/cellline/${data.cellName}`))
    })
  })
}

export const searchDrugPages = (tableIndex, drugName, page, size) => {
  return axios.get(`/convert/origin/${tableIndex}/searchDrugCombinationPages?q=${encodeURIComponent(drugName)}&page=${page}&size=${size}`)
}
