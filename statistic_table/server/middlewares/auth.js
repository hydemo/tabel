import request from './async';
import config from 'config';
import sign from './sign';
import userDal from '../proxy/user';

export default {
  // 验证token
  async tokenCheck(req, res, next) {
    try {
      // 验证access_token 是否有效， 记teambition 验证token的频率一分钟不能超过60次
      const {status} = await request.axios_get(
        `${config.api}/api/applications/${config.clientId}/tokens/check`,
        req.session.user.access_token
      );

      status === 200
        ? next()
        : res.sendstatus(400).json({name: 'InvalidCode', message: '无效的 token'});
    } catch (e) {
      return next(e);
    }
  },
  // 登录授权teambition
  async login(req, res, next) {
    const {code} = req.params;
    try {
      const {data} = await request.axios_post(
        `${config.account_api}/oauth2/access_token`, {
          client_id: config.clientId,
          client_secret: config.clientSecret,
          code: code
        });
      // 以access_token 查询teambition当前用户信息
      let user = await request.axios_get(`${config.api}/api/users/me`,
        data.access_token);

      user.data.access_token = data.access_token;
      //更新数据库中的用户信息
      let userinfo = await userDal.updateUser(user.data);

      sign.gen_session(userinfo, res);

      res.locals.user = req.session.user = userinfo;

      res.json(userinfo);
    } catch (e) {
      return next(e);
    }
  },
  async authUser(req, res, next) {
    if (req.session.user) {
      return next();
    } else {
      const auth_token = req.signedCookies[config.auth_cookie_name];
      if (!auth_token) {
        return res.sendstatus(400).json({name: 'InvalidCode', 
          message: '无效的 token'});
      }

      const auth = auth_token.split('$$$$');
      const user_id = auth[0];
      const user = await userDal.getUserById(user_id);

      res.locals.user = req.session.user = user;
      
      return next();
    }
  }
};
