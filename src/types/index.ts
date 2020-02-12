/* 项目中公共的类型定义文件 */

// 定义请求类型
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'delete'
  | 'Delete'

export interface AxiosRequestConfig {
  url: string // url 必须属性
  method?: Method // 请求方法可选，默认get
  data?: any // data数据，给post方法使用，可以是任何类型
  params?: any // param数据，给get方法使用
}
