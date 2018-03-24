import express from 'express';
import sign from './controller/sign';
import auth from './middlewares/auth';
import xlsx from './controller/xlsx';


const routers = express.Router();
//分配路由

//测试接口
//获取数据库任务接口
routers.get('/alltasks', sign.getDbTask);
//得到项目自定义字段
routers.get('/projectcustomfield', sign.getProjectCustomfield);
//得到项目中所有任务
routers.get('/tbtask', sign.getTasks);
//得到项目中的任务类型

//前端需求接口
//登录授权接口
routers.get('/api/login/:code', auth.login);
routers.get('/scenario', sign.getScenarioField);
//获取表头接口
routers.get('/title', sign.getTitle);
//根据指定条件得到任务接口
routers.get('/task', sign.searchTask);
//excel表格下载接口
routers.get('/xlsx', xlsx.downxlsxs);

routers.get('/', (req, res, next) => {
  res.send(req.query);
})

export default routers;
