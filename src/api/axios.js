/*
  能发送异步网络请求的axios模块
  返回的是Promise对象
*/
import originAxios from 'axios'

export function request(option, method = "post") {
  return new Promise((resolve, reject) => {
    // 创建axios实例
    const instance = originAxios.create({
      method: method,
      baseURL: 'http://localhost:8080/proxy',
      timeout: 5000
    })

    // 请求和拦截
    instance.interceptors.request.use(config => {
      return config
    }, err => {
      console.log(err)
    })

    instance.interceptors.response.use(res => {
      return res
    }, err => {
      console.log(err)
    })

    instance(option).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function weather (option) {
  return new Promise ((resolve, reject) => {
    const instance = originAxios.create({
      baseURL: "https://restapi.amap.com/v3/weather/weatherInfo",
      timeout: 5000
    })

    instance.interceptors.request.use(config => {
      return config
    }, err => {
      console.log(err)
    })

    instance.interceptors.response.use(res => {
      return res
    }, err => {
      console.log(err)
    })

    instance(option).then(res => {
      resolve(res.data.lives[0])
    }).catch(err => {
      reject(err)
    })
  })
}