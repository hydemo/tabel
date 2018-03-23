import jsdom from 'jsdom';
import request from './async';
import config from 'config';

export default {
  /**
  * -- {用户后台登录此用户的token} --
  * @param {String} email 邮箱 = 用户名 
  * @param {String} pwd 密码
  * @returns {void} promise 
  * @author:hy
  */
  async access_token(email, pwd) {
    const { JSDOM } = jsdom;
    let dom = await JSDOM.fromURL(`${config.account_api}/login`);
    let document = dom.window.document.getElementById('secrets');
    let clientId = document.getAttribute('data-clientid');
    let token = document.getAttribute('data-clienttoken');
    let result = await request.
      axios_post(`${config.account_api}/api/login/email`, {
        email: email,
        password: pwd,
        response_type: 'token',
        client_id: clientId,
        token: token
      });
    return result.data ? result.data.access_token : null;
  },
  /**
  * -- { 获取项目中所有自定义字段 } --
  * @param {String} projectId 项目id
  * @param {String} token teambition唯一验证码 
  * @returns {void} promise 
  * @author:hy
  */
  async getProjectCustomfields(projectId, token) {
    const url = 
      `${config.api}/api/projects/${projectId}/customfieldlinks?boundType=application`;
    if (!token) {
      token = await this.
        access_token(config.account.email, config.account.pwd);    
    }
    return await request.axios_get(url, token);
  },
  /**
  * -- { 获取项目中所有任务 } --
  * @param {String} projectId 项目id
  * @param {String} token teambition唯一验证码   
  * @returns {void} promise 
  * @author:hy
  */
  async getTasks(projectId, token) {
    const url = 
      `${config.api}/api/projects/${projectId}/tasks`;
    if (!token) {
      token = await this.
        access_token(config.account.email, config.account.pwd);
    }
    return await request.axios_get(url, token);
  },
  /**
   * ----{获得任务列表}----
   * @param {String} projectId 项目id
   * @param {String} token teambiton唯一验证码
   * @returns {void} promise
   * @author:oy
   */
  async getScenarioField(projectId, token) {
    const url = 
      `${config.api}/api/projects/${projectId}/scenariofieldconfigs?objectType=task`;
    if (!token) {
      token = await this.
        access_token(config.account.email, config.account.pwd);
    }
    return await request.axios_get(url, token);
  },
};
