import request from '../utils/request';
/* eslint-disable no-tabs */
// 默认method 为 get, 当请求方法为get时.可不填method参数

export function login(query) {
  return request({
    url: `/api/login/${query.code}`,
  });
}
