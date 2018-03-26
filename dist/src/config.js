// 服务器地址
let baseUri = 'http://47.96.20.193:8080';

// CLIENT_ID
let CLIENT_ID = '42096170-f743-11e7-b297-3d5e40c4d20d';

// Teambition 认证配置
let OAUTh_URL = 'https://account.teambition.com/oauth2/authorize';


// 生产环境, 默认为开发环境
// if (process.env.NODE_ENV === 'production') {
//   baseUri = 'http://47.96.20.193:8080';
//   CLIENT_ID = '656cc320-2c07-11e8-86af-d15cb8f8c7f8';
//   OAUTh_URL = 'https://account.teambition.com/oauth2/authorize';
// }

export default {
  baseUri,
  CLIENT_ID,
  OAUTh_URL,
};

