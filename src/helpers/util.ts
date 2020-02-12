/* 工具 */

// 定义变量保存，可以在多次调用时创建一次，后续的都会使用缓存的值
const toString = Object.prototype.toString

/* 判断类型是否为日期 */
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

/* 判断类型是否为对象 */
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
