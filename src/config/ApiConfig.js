const devUrl = 'http://localhost:8888/'
const productUrl = 'http://drugcombdb.denglab.org:8888/'
const baseUrl = process.env.NODE_ENV === 'development' ? devUrl : productUrl
export const ApiConfig = {
  baseURL: baseUrl,
  timeout: 10000
}
