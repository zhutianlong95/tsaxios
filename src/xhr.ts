import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { parseHeaders} from './helpers/header'

/* 返回类型为AxiosPromise类型 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    // 利用解构赋值拿到相应数据
    const { data = null, url, method = 'get', headers, responseType } = config

    // 新建请求对象
    const request = new XMLHttpRequest()

    // 如果设置了响应类型，则将请求的响应类型改为设置的值
    if(responseType) {
      request.responseType = responseType
    }

    // 打开请求发送数据
    request.open(method.toUpperCase(), url, true)

    // 监听状态码改变
    request.onreadystatechange = function handleLoad() {
      if(request.readyState !== 4) { // 如果不是4，则说明请求顺利接收到了
        return 
      }
    
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      // 请求类型不为text的时候，响应数据为响应数据，否则为响应文本
      const responseData = responseType !== 'text' ? request.response : request.responseText
      
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      }
      
      resolve(response)
    }

    Object.keys(headers).forEach((name) => {
      if(data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
      
    })
    request.send(data)
  })
  
}
