import axios from 'axios'
import { apiConfig } from './config'
// import { ElNotification } from 'element-plus'

const instance = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: 30000,
})

// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    return config
  },
  (error) => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // res.status http status code
    if (response.status >= 200 && response.status < 300) {
      if (response.data.msg) {
        // ElNotification({
        //   title: 'Success',
        //   type: 'success',
        //   message: response.data.msg,
        //   duration: 2 * 1000,
        // })
      }
      return response
    } else {
      if (response.statusText) {
        // ElNotification({
        //   title: 'Info',
        //   type: 'info',
        //   message: response.statusText,
        //   duration: 3 * 1000,
        // })
      }
      return Promise.reject(response)
    }
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // ElNotification({
    //   title: 'Error',
    //   type: 'error',
    //   message: error.message,
    // })

    return Promise.reject(error)
  }
)

export default instance
