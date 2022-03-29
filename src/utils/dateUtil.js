/**
 * 时间相关处理工具类
 */

import moment from 'moment'

/**
 * 时间加减函数
 * @param date 时间
 * @param interval 年月日时分秒标识k中的参数
 * @param number 数量例如加10天，number:+10，减10天，number:-10
 * @param format 时间格式化 默认yyyy-MM-DD HH:mm:ss
 * @returns {string} 对应时间格式的字符串
 */
export function dateAdd(date, interval, number, format) {
    let newDate = new Date();
    const k = {
        'y': 'FullYear',
        'M': 'Month',
        'd': 'Date',
        'h': 'Hours',
        'm': 'Minutes',
        's': 'Seconds'
    };
    eval('newDate.set' + k[interval] + '(newDate.get'+ k[interval] + '() + ' + number + ')')
    if (!format) {
        format = 'yyyy-MM-DD HH:mm:ss'
    }
    return moment(newDate).format(format);
}
/**
 * 获取当前时间是周几
 * @param time 时间
 * @returns {string} 对应周几
 */
export function getWeekday(time){
    let list = ['周日', '周一','周二','周三','周四','周五','周六'];
    return list[moment(time).isoWeekday()];
}

