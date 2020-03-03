import { isPlainObject } from './util'
import { normalize } from 'path'

// 辅助函数，处理属性名
function normalizeHeaderName(headers: any, normalizeName: string): void {
  // 没有headers，直接返回
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  // 判断data是否为普通对象，如果是，添加contentType
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}
