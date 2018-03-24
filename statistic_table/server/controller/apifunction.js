import teambition from '../middlewares/teambition';
import config from 'config';
import Title from '../proxy/title';
import Task from '../proxy/task';
import id from '../middlewares/id';


export default {
  
  login(req, res, next) {
    try {
      return res.render('login');
    } catch(err) {
    return next(err);
    }
  },
  //获取项目自定义字段
  async getProjectCustomfield(req, res, next) {
    try {
      let projectId = req.query.project;
      let token = await teambition.
        access_token(config.account.email, config.account.pwd);
      let result = await teambition.
        getProjectCustomfields(projectId, token);
      return res.json(result.data);
    } catch (err) {
      return next(err);
    }    
  },
  //获取项目中所有任务
  async getTasks(req, res, next) {
    try {
      let projectId = req.query.project;
      let result = await teambition.
        getTasks(projectId, );
      return res.json(result.data);
    } catch (err) {
      return next(err);
    }    
  },
  //获取项目中的任务类型
  async getScenarioField(req, res, next) {
    try {
      let projectId = req.query.project;
      let result = await teambition.getScenarioField(projectId);
      return res.json(result.data);
    } catch (err) {
      return next(err);
    }    
  },
  //获取数据库所有任务类型
  async getTitle(req, res, next) {
    try {
      let scenarioId = req.query.scenarioId;
      let title = await Title.getTitleById(scenarioId);
      return res.json(title);
    } catch (err) {
      return next(err);
    }
  },    
  //获取数据库所有任务类型
  async getDbTask(req, res, next) {
    try {
      let projectId = req.query.project;
      let task = await Task.findAll(projectId);
      return res.json(task);
    } catch (err) {
      return next(err);
    }    
  },
  //指定条件的任务搜索接口
  async searchTask(req, res, next) {
    try {
      let query = {
        current: Number(req.query.current) || 1,
        pageSize: Number(req.query.pageSize),
        scenarioId: req.query.scenarioId,
        value: req.query.value || '',
      };
      let customFieldIds = 
        await id.getCustomFieldIds(req.query.scenarioId);
      let result = await Task.serchTask(query, customFieldIds);
      res.json(result);
    } catch (err) {
      return next(err);
    }    
  },
} 
