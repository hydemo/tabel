import _ from 'lodash';
import Task from '../proxy/task';
import id from '../middlewares/id';
import moment from 'moment';


export default {
  //过滤非法字符
  delStr(str) {
    str = str.replace(/\n/g, '');
    str = str.replace(/\t/g, '');
    str = str.replace(/\r/g, '');
    str = str.replace(/\s*/g, '');
    str = str.replace(/<\/?[^>]*>/g, '');
    return str;
  },
  /**
   * ----{通过自定义字段id封装任务的自定义字段}----
   * @param {object} taskCustomFields 任务自定义字段
   * @param {object} projectFields 项目自定义字段
   * @returns {void} promise
   * @author:oy
   */
  async updateTaskField(taskCustomFields, projectFields) {
    try { 
      let customfields = {};
      taskCustomFields.map(val => {
        let field = _.find(projectFields, {
          _customfieldId: val._customfieldId
        });
        if (val.type === 'text') {
          customfields[val._customfieldId] = val.values[0];
        } else if (val.type === 'date') {
          let date = new Date(val.values[0]).getTime();
          customfields[`${val._customfieldId}_date`] = 
            moment(date).format('YYYY-MM-DD hh:mm');
        } else if (val.type === 'number') {
          customfields[val._customfieldId] = val.values[0];
        } else if (val.type === 'dropDown') {
          let result = _.find(field.choices, {
            _id: val.values[0]
          });
          customfields[val._customfieldId] = result.value
        } else if (val.type === 'multipleChoice') {
          let choices = []
          for (let value of val.values) {
            let result = _find(field.choices, { _id: value });
            choices.push(result.value);
          }
          customfields[val._customfieldId] = choices.toString;
        }
      });
      return customfields;
    } catch (err) {
      console.log(err);
    }
  },
  /**
   * ----{将封装好的自定义字段和其他属性封装到task}----
   * @param {object} taskFields 所有任务信息
   * @param {object} projectFields 项目自定义字段
   * @returns {void} promise
   * @author:oy
   */
  async group(taskFields, projectFields){
    let tasks = [];
    if (!taskFields) {
      return [];
    }
    try {
      for (let taskField of taskFields) {
        if (taskField.customfields && taskField.customfields) {
          let customfields = await this.updateTaskField(
            taskField.customfields, projectFields);
          let scenarioIds = 
            await id.getScenarioIds(taskField._projectId);
          let object = {
            //项目Id
            projectId:  taskField._projectId,
            //任务id
            taskId: taskField._id,
            //任务名称
            taskName: taskField.content,
            //任务分组id
            scenarioFieldConfigId: taskField._scenariofieldconfigId,
            //更新时间
            update: taskField.updated,
            //自定义字段
            customfields: customfields
          };
          if (!object.scenarioFieldConfigId) {
            object.scenarioFieldConfigId = scenarioIds[0]
          }
          tasks.push(object);
        }
      }
      return tasks;
    } catch (err) {
      console.log(err);
    }
  },
  /**
   * ----{通过封装好的task更新任务数据库}----
   * @param {object} taskFields 全部任务信息 
   * @param {object} projectFields 项目自定义字段
   * @returns {void} promise
   * @author:oy
   */
  async updateTask(taskFields, projectFields) {
    try {
      let tasks = await this.group(taskFields, projectFields);
      if (taskFields.length === 0){
        return taskFields;
      }
      for (let task of tasks) {
        let bool = await Task.getTaskById(task.taskId);
        if (taskFields && task.update) {
          task.update = new Date(task.update).getTime();
        } else {
          task.update = 0;
        }
        if (bool) {
          console.log('bool', bool);
          await Task.updateTask(task);
        } else {
          await Task.insertTask(task);
        }
      } 
    } catch (err) {
      console.log(err);
    }
  },
};
