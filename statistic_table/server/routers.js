import express from 'express';
import sign from './controller/sign';
import auth from './middlewares/auth';
import xlsx from './controller/xlsx';


const routers = express.Router();
//分配路由

//测试接口
//获取任务接口
routers.get('/gettasks', sign.getDbTask);
//得到项目自定义字段
routers.get('/getprojectcustomfield', sign.getProjectCustomfield);
//得到项目中所有任务
routers.get('/gettask', sign.getTasks);
//得到项目中的任务类型

//前端需求接口
//登录授权接口
routers.get('/api/login/:code', auth.login);
routers.get('/getscenario', sign.getScenarioField);
//获取表头接口
routers.get('/gettitle', sign.getTitle);
//根据指定条件得到任务接口
routers.get('/listtask', sign.searchTask);
//excel表格下载接口
routers.get('/getxlsx', xlsx.downxlsxs);

routers.get('/', (req, res, next) => {
  res.send(req.query);
})

export default routers;
