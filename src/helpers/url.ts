/* 负责处理url(拼接参数)的工具函数 */
import { isDate, isObject } from './util'

// 编码处理
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace('/%40/g', '@')
    .replace('/%3A/ig', ':')
    .replace('/%24/g', '$')
    .replace('/%2C/ig', ',')
    .replace('/%20/g', '+')
    .replace('/%5B/ig', '[')
    .replace('/%5D/ig', ']')
}

// 接收参数 url和参数（可选）
export function buildURL(url: string, params: any): string {
  // 不传参数，直接返回url
  if (!params) return url

  // 传参数
  /* 使用键值对数组来存储遍历的参数 */
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]

    // 值为空则return，在forEach中，return不会跳出方法，而是进行下一次循环
    if (val === null || typeof val === 'undefined') return

    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }

      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let finalParams = parts.join('&')

  if (finalParams) {
    // 判断url中是否有哈希标识#
    const index = url.indexOf('#')
    if (index !== -1) {
      url = url.slice(0, index)
    }

    // 判断url是否有参数，有参数则使用&拼接，没有参数，使用？拼接
    url += (url.indexOf('?') === -1 ? '?' : '&') + finalParams
  }

  return url
}
