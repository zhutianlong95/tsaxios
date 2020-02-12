/* 入口文件，进行简单的请求 */
import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/url'

function axios(config: AxiosRequestConfig) {
  // 预处理config，主要是url和params
  processConfig(config)
  // 进行请求
  xhr(config)
}

// 处理config
function processConfig(config: AxiosRequestConfig): void {
  // 处理config中的url和参数问题
  config.url = transformURL(config)
}

/* 转化url */
function transformURL(config: AxiosRequestConfig): string {
  // 通过解构赋值，从config中拿到url和params
  const { url, params } = config
  return buildURL(url, params)
}

export default axios
