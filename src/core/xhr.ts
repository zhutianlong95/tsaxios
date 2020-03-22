import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { parseHeaders} from '../helpers/header'
import { createError } from '../helpers/error'

/* 返回类型为AxiosPromise类型 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // 利用解构赋值拿到相应数据
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    // 新建请求对象
    const request = new XMLHttpRequest()
 
    // 如果设置了响应类型，则将请求的响应类型改为设置的值
    if(responseType) {
      request.responseType = responseType
    }

    // 如果有传timeout的值，将值赋给请求的timeout,如不传值，request的timeout默认是0，永不超时，单位毫秒
    if(timeout) {
      request.timeout = timeout
    }

    // 打开请求发送数据
    request.open(method.toUpperCase(), url!, true)

    // 错误事件
    request.onerror = function handleError() {
      reject(createError('network error', config, null, request)) // reject必须有一个error的实例
    }

    // 超时事件
    request.ontimeout = function handleTimeout() {
      reject(createError(`timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }
    // 监听状态码改变
    request.onreadystatechange = function handleLoad() {
      if(request.readyState !== 4) { // 如果不是4，则说明请求顺利接收到了
        return 
      }
    
      if(request.status === 0) { // 网络错误或者超时的时候，接收到的状态码是0，此时直接返回
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

    function handleResponse(response:AxiosResponse): void {
      // 成功的请求
      if(response.status >= 200 && response.status <300) {
        resolve(response)
      } else { // 失败的话释放错误
        reject(createError(`请求失败，状态码：${response.status}`, config, null, request, response))
      }

    }
  })
  
}
