import axios from 'axios'
import { Notification } from 'element-ui'

// create an axios instance

function axiosApi(imp){
  const service = axios.create({
    baseURL:imp , // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 15000 // request timeout
  })

  // request拦截器
  service.interceptors.request.use(
    config => {
      config.headers['Access-Control-Allow-Origin'] = '*';
      let token = window.localStorage.getItem('token');
      if (token) {
          config.headers['token'] = token;
          config.headers['Authorization'] = 'Bearer ' + token;
        return config;
      }
      return config
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )

// response interceptor
  service.interceptors.response.use(
    response => {
      const code = response.status
      if (code < 200 || code > 300) {
        // Notification.error({
        //   title: response.message
        // })
        return Promise.reject('error')
      } else {
        return response.data
      }
    },
    error => {
      let code = 0
      try {
        code = error.response.data.status
      } catch (e) {
        if (error.toString().indexOf('Error: timeout') !== -1) {
          // Notification.error({
          //   title: '网络请求超时',
          //   duration: 5000
          // })
          return Promise.reject(error)
        }
      }
      if (code) {
        if (code === 401) {
          location.reload()
        } else if (code === 403) {
          router.push({ path: '/401' })
        } else {
          const errorMsg = error.response.data.message
          if (errorMsg !== undefined) {
            // Notification.error({
            //   title: errorMsg,
            //   duration: 5000
            // })
          }
        }
      } else {
        // Notification.error({
        //   title: '接口请求失败',
        //   duration: 5000
        // })
      }
      return Promise.reject(error)
    }
  )
  return service
}
export default axiosApi
