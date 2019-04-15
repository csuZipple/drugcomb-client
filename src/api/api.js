import {axios} from '../axios/api.request'

export const getDrugCombPagination = (page, size) => {
  return axios.get(`/combination/list`, {
    params: {
      page,
      size
    },
    retry: 1, // 设置超时重发
    retryDelay: 1000
  })
}

export const getDrugIntegrationPages = (page, size) => {
  return axios.get(`/integration/list`, {
    params: {
      page,
      size
    }
  })
}

export const getIndividualDrugCombinationByBlockId = (blockId) => {
  return axios.get(`/combination/list/${blockId}`)
}

export const getIndividualDrugIntegrationByBlockId = (blockId) => {
  return axios.get(`/integration/list/${blockId}`)
}

export const getDrugInfoByDrugName = name => {
  return axios.get(`/chemical/info/${name}`)
}

export const getCellLineInfoByBlockId = (blockId) => {
  return new Promise((resolve, reject) => {
    getIndividualDrugIntegrationByBlockId(blockId).then(data => {
      return data
    }).then(data => {
      resolve(axios.get(`/cellLine/cellName?q=${encodeURIComponent(data.cellName)}`))
    })
  })
}

export const searchDrugPages = (drugName, page, size) => {
  return axios.get(`/integration/search/${encodeURIComponent(drugName)}?page=${page}&size=${size}`)
}
