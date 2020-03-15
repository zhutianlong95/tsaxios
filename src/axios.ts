/* 入口文件，进行简单的请求 */

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/header'

function axios(config: AxiosRequestConfig): AxiosPromise {
  // 预处理config，主要是url和params
  processConfig(config)
  // 进行请求
  return xhr(config).then((res) => {
    console.log(res)
    return transformResponseData(res)
  })
}

/* 处理config */
function processConfig(config: AxiosRequestConfig): void {
  // 处理config中的url和参数问题
  config.url = transformURL(config)

  // 先处理headers，避免将data处理成json字符串后就无法判断类型是否为对象
  config.headers = transformHeaders(config)

  // 处理config中的请求数据
  config.data = transformRequestData(config)
  
}

/* 转化url */
function transformURL(config: AxiosRequestConfig): string {
  // 通过解构赋值，从config中拿到url和params
  const { url, params } = config
  return buildURL(url, params)
}

/* 转化请求参数 */
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

/* 转化headers */
function transformHeaders(config: AxiosRequestConfig): any {
  // 给headers一个默认值空对象，在不管有没有headers的情况下，根据data是否为空对象来设置默认的ContentType
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

/* 转化响应数据 */
function transformResponseData(res:AxiosResponse):AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

export default axios
