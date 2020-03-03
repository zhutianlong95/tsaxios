import { AxiosRequestConfig } from './types/index'

export default function xhr(config: AxiosRequestConfig): void {
  // 利用解构赋值拿到相应数据
  const { data = null, url, method = 'get', headers } = config

  // 新建请求对象
  const request = new XMLHttpRequest()

  // 打开请求发送数据
  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach(name => {
    if ((data === null) & (name.toLowerCase() === 'content-type')) {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })
  request.send(data)
}
