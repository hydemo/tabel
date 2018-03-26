import axios from 'axios';
import config from 'Config';
import cookies from 'js-cookie';

export default function request(options) {
  const axiosReq = axios.create({
    timeout: 10000,
    baseURL: config.baseUri,
  });

  axiosReq.interceptors.request.use((params) => {
    // 在授权登录页面中, 请求头中不加token
    if (window.location.pathname.indexOf('/login') < 0) {
      const token = cookies.get('token');
      // console.log('token:'+token);
      params.headers = {
        ...params.headers,
        token,
      };
    }
    return params;
  });

  axiosReq.interceptors.response.use(response => response.data, (error) => {
    console.log('error.data', error.data);
  });
  return axiosReq(options)
    .catch((error) => {
      if (error) {
        console.log('request error', error);
      }
    });
}
