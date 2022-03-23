import axiosApi from './index';
import { handleParamsUrl } from '../utils/index'
let baseUrl = '/'
const request = axiosApi(baseUrl);

/**
 * post请求
 * @param url
 * @param data
 * @returns {*}
 */
export function post(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

/**
 * get请求
 * @param url
 * @param params
 * @returns {*}
 */
export function get(url, params) {
  return request({
    url: url,
    method: 'get',
    params,
  })
}

/**
 * get形式的下载
 * @param url
 * @param params
 */
export function downLoad(url, params) {
  window.location.href =  handleParamsUrl(baseUrl + url, params);
}
