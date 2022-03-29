/**
 * 正则表达式工具类
 */

/**
 * 整数
 * @param value
 * @returns {boolean}
 */
export function isInt(value) {
    let reg = /^(0?|-?[1-9]\d*)$/
    if (!reg.test(value)) {
        return false
    }
    return true
}

/**
 * 整数或小数
 * @param value
 * @returns {boolean}
 */
export function isDecimal(value) {
    let reg = /^(-?[0-9]\d*)(.\d*[1-9])?$/
    if (!reg.test(value)) {
        return false
    }
    return true
}

/**
 * 手机号
 * @param value
 * @returns {boolean}
 */
export function isPhone(value) {
    let reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
    if (!reg.test(value)) {
        return false
    }
    return true
}

/**
 * 邮箱
 * @param value
 * @returns {boolean}
 */
export function isEmail(value) {
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!reg.test(value)) {
        return false
    }
    return true
}
