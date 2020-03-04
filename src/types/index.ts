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


/* 请求配置接口 */
export interface AxiosRequestConfig {
  url: string // url 必须属性
  method?: Method // 请求方法可选，默认get
  data?: any // data数据，给post方法使用，可以是任何类型
  params?: any // param数据，给get方法使用
  headers?: any // headers属性,可选
  responseType?: XMLHttpRequestResponseType // 响应类型
}

/* 响应数据接口 */
export interface AxiosResponse {
  data: any // 服务端返回的数据
  status: number // 状态码
  statusText: string // 状态内容
  headers: any // 返回请求头
  config: AxiosRequestConfig 
  request: any
}
export interface AxiosPromise extends Promise<AxiosResponse> {

}