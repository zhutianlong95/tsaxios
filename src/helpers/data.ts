/* 转化请求参数 */

import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  // 判断是不是对象
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  //
  return data
}
