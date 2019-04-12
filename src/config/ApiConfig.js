const devUrl = 'http://localhost:8080/'
const productUrl = 'http://drugcombdb.denglab.org:8080/'
const baseUrl = process.env.NODE_ENV === 'development' ? devUrl : productUrl
export const ApiConfig = {
  baseURL: baseUrl,
  timeout: 10000
}
