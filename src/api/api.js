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
export const getDrugInfoExtraByDrugId = id => {
  return axios.get(`/chemical/extra/${id}`)
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

export const getRecommendDrugIntegrationList = () => {
  return axios.get(`/integration/recommends`)
}

export const searchDrugCombinationByCombinationName = (combination, page, size) => {
  return axios.get(`/integration/search`, {
    params: {
      combination,
      page,
      size
    }
  })
}

export const searchDrugPages = (drugName, page, size) => {
  return axios.get(`/integration/search/${encodeURIComponent(drugName)}?page=${page}&size=${size}`)
}

export const getDrugProteinLinksInformation = drugId => {
  return axios.get(`/proteins/${drugId}`, {
    timeout: 30000
  })
}
export const getDrugProteinLinksPages = (drugId, page, size) => {
  return axios.get(`/proteins/${drugId}/page`, {
    timeout: 30000,
    params: {
      page,
      size
    }
  })
}
export const downloadFileByIndex = index => {
  return axios.post(`/download/${index}`, {}, {
    timeout: 60000,
    isCompleteResponse: true,
    responseType: 'blob'
  })
}
