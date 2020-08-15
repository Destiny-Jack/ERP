import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { setToken, getAccessToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000000 // request timeout
})
// request interceptors 请求拦截器
service.interceptors.request.use(
  config => {
    // 让每个请求携带token
    if (store.getters.token) {
      config.headers['Authorization'] = 'erp-token ' + getAccessToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

export default function ajax(url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = service.get(url)
    } else if (type === 'POST') {
      // 发送post请求
      promise = service.post(url, data)
    } else if (type === 'PUT') {
      // 发送put请求
      promise = service.put(url, data)
    } else if (type === 'DELETE') {
      // 发送put请求
      promise = service.delete(url, data)
    }

    promise
      .then(response => {
        // 获取token , 储存起来
        if (response.headers.authorization) {
          setToken(response.headers.authorization)
        }
        const res = response.data
        if (res.state === 'success') {
          // 返回状态成功
          resolve(res)
        } else if (res.state === 'warning') {
          // 返回状态警告
          Message({
            message: `${res.message}` || 'warning',
            type: 'warning',
            duration: 3 * 1000
          })
          resolve(res)
        } else if (res.state === 'error') {
          // 返回状态错误
          // Message({
          //   message: `${res.message}` || 'error',
          //   type: 'warning',
          //   duration: 2 * 1000
          // })
          const error = {
            requestURL: response.config.url,
            message: res.message
          }
          return Promise.reject(error)
        } else {
          resolve(res)
        }
      })
      .catch(error => {
        console.log(error) // for debug
        Message({
          message: `${error.message}`,
          type: 'error',
          duration: 3 * 1000
        })
        // 失败了调用reject()
        reject(error)
      })
  })
}