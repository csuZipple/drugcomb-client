<template>
  <FullPage>
    <section class="api-container">
      <div>
        <div class="api-code" v-highlight>
          <HeaderTitle>
            Config
          </HeaderTitle>
          <pre>
const devUrl = 'http://localhost:8888/'
const productUrl = 'http://drugcombdb.denglab.org:8888/'
const baseUrl = process.env.NODE_ENV === 'development' ? devUrl : productUrl
export const ApiConfig = {
  baseURL: baseUrl,
  isCompleteResponse: false,
  timeout: 10000
}
          </pre>
          <HeaderTitle>
            Example
          </HeaderTitle>
          <pre>
export const getDrugCombPagination = (page, size) => {
  return axios.get(`/combination/list`, {
    params: {
      page,
      size
    },
    retry: 1,
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

export const downloadFileByIndex = index => {
  return axios.post(`/download/${index}`, {}, {
    timeout: 60000,
    isCompleteResponse: true,
    responseType: 'blob'
  })
}
          </pre>
          <p style="padding: 10px;">
            Todo: explain all API
          </p>
        </div>
      </div>
    </section>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
import HeaderTitle from '../../components/Header/HeaderTitle'
export default {
  name: 'api',
  components: {HeaderTitle, FullPage}
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  .api-container {
    margin-top: 5px;
    padding: 15px 30px;
    min-height: calc(100vh - 75px);
    text-align: left;
    background: #ffffff;

    & > div {
      width: 1000px;
      margin: 0 auto;
      height: 100%;

      .api-code pre{
        font-size: 14px;
        padding: 10px;
        white-space: pre-wrap;
        border-radius: 4px;
        border: 1px solid #eeeeee;
      }
    }
  }
</style>
