import teambition from './teambition';
import Title from '../proxy/title'


//获取项目所需的id列表
export default {
  /**
   *----{获取所有项目列表id汇总}---- 
   * @param {String} projectId 项目id
   * @param {String} token teambition唯一验证码
   * @returns {void} promise
   * @author:oy
   */
  async getScenarioIds(projectId, token) {
    let scenarioIds = [];
    let scenarioFields = await teambition.getScenarioField(projectId);
    for (let scenarioField of scenarioFields.data) {
      scenarioIds.push(scenarioField._id);
    }
    return scenarioIds;
  },
  /**
   * ----{获取所有任务id汇总}----
   * @param {String} projectId 项目id
   * @param {String} token teambiton唯一验证码
   * @returns {void} promise
   * @author:oy
   */
  async getTaskIds(projectId, token) {
    let taskIds = [];
    let taskFields = await teambition.getTasks(projectId, token);
    for (let taskField of taskFields.data) {
      taskIds.push(taskField._id);
    }
    return taskIds;
  },
  /**
   * ----{获得固定任务类型id下所有的自定义字段集}----
   * @param {String} scenarioId 任务类型id
   * @returns {Array} 自定义字段集
   * @author:oy 
   */
  async getCustomFieldIds(scenarioId) {
    let title = await Title.getTitleById(scenarioId);
    return Object.keys(title.titleFields);
  },
}
