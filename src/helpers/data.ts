/* 转化请求参数 */

import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  // 判断是不是对象
  // console.log(data)
  if (isPlainObject(data)) {
    
    return JSON.stringify(data)
  }

  return data
}

// 处理响应数据
export function transformResponse(data: any):any {
  if(typeof data === 'string') {
    try{
      data = JSON.stringify(data)
    }catch(e) {
      // do nothing
    }
  }
  return data
}