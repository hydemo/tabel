import teambition from '../middlewares/teambition';
import config from 'config';
import titleSave from './titlesave';
import taskSave from './tasksave';
import Title from '../proxy/title';
import Task from '../proxy/task';
import id from '../middlewares/id';
import nodeSchedule from 'node-schedule';
import logger from '../common/logger';
import pm2 from 'pm2';
import moment from 'moment';

export default {
  async operation() {
    try {
      console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')}
      -------{开始}--------`);
      let projectId = config.projectId;
      let scenarioFields = await teambition.getScenarioField(projectId);
      let projectFields = await teambition.getProjectCustomfields(projectId);
      let taskFields = await teambition.getTasks(projectId);
      let scenarioIds = await id.getScenarioIds(projectId);
      let taskIds = await id.getTaskIds(projectId);
      await titleSave.updateTitle(scenarioFields.data, projectFields.data);
      await taskSave.updateTask(taskFields.data, projectFields.data);
      await Title.removeTitle(scenarioIds);
      await Task.removeTask(taskIds);
      console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')}
      ----{结束}----`);
      return;
    } catch (e) {
      return this.restart(e);
    }
  },
  timeTask() {
    const rule = new nodeSchedule.RecurrenceRule();
    const time = [];
    for (let i = 1; i < 60; i += 1){
      time.push(i);
    }
    rule.minute = time;
    nodeSchedule.scheduleJob(rule, ()=> {
      this.operation();        
    })      
  },  
  restart(err) {
    console.log('operation-err:', err);
    pm2.restart('time', (error, proc) => {
      if (!error){
        console.log('proc', proc);;
      } 
    });
  },
}
