import axios from 'axios';


export default {
  /**
   * -- {带token 的 get请求} --
   * @param {String}  url 访问地址
   * @param {String}  token Teambition唯一验证码
   * @returns {void} promise
   * @author:ls
   */
  async axios_get(url, token) {
    return await axios({
      method: 'get',
      url: url,
      headers: {Authorization: `OAuth2 ${token}`}
    });
  },
  /**
   * -- {post请求} --
   * @param {String}  url 访问地址
   * @param {object}  data 传输数据
   * @returns {void} promise
   * @author:ls
   */
  async axios_post(url, data) {
    return await axios(url, {
      method: 'post',
      url: url,
      data: data
    });
  },
  /**
   * -- {带token的delete请求} --
   * @param {String}  url 访问地址
   * @param {String}  token teambition唯一验证码
   * @returns {void} promise
   * @author:ls
   */
  async axios_delete(url, token) {
    return await axios({
      method: 'delete',
      url: url,
      headers: {Authorization: `OAuth2 ${token}`}
    });
  },
  /**
   * -- {带token 的 post请求} --
   * @param {String}  url 访问地址
   * @param {object}  data 传输数据
   * @param {String}  token Teambition唯一验证码
   * @returns {void} promise
   * @author:ls
   */
  async axios_postToken(url, data, token) {
    return await axios({
      method: 'post',
      url: url,
      data: data,
      headers: {Authorization: `OAuth2 ${token}`}
    });
  },
  /**
   * -- {有头部的post请求} --
   * @param {String}  url 访问地址
   * @param {Object}  headers 发送头部
   * @param {object}  data 传输数据
   * @returns {void} promise
   * @author:ls
   */
  async axios_head_post(url, headers, data) {
    return await axios({
      method: 'post',
      url: url,
      headers,
      data
    });
  },
  /**
   * -- {带token的put请求} --
   * @param {String}  url 访问地址
   * @param {object}  data 传输数据
   * @param {String} token teambition 唯一验证码
   * @returns {void} promise
   * @author:ls
   */
  async axios_put(url, data, token) {
    return await axios({
      method: 'put',
      url: url,
      data: data,
      headers: {Authorization: `OAuth2 ${token}`}
    });
  },
};
