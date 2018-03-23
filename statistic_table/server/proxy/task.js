import { Task } from  '../models/model';

//封装task数据库操作方法
export default {
  /**
   * ----{根据任务类型id搜索任务}----
   * @param {String} scenarioFieldConfigId 任务类型id
   * @returns {object} 返回的task对象
   * @author:oy
   */
  async getTaskById(scenarioFieldConfigId) {
    try {
      return await Task.find({ scenarioFieldConfigId }).exec();
    } catch (error) {
      throw new Error(error);
    }
  },
  /**
   * ----{数据库中添加新的任务}----
   * @param {object} object 待添加的task对象
   * @returns {produce} 返回保存后的修改信息
   * @author:oy
   */
  async insertTask(object) {
    let task = new Task(object);
    return await task.save();
  },
  /**
   * ----{更新数据库中的任务}----
   * @param {object} object 待更新的task对象
   * @returns {product} 返回更新后的修改信息
   * @author:oy
   */
  async updateTask(object) {
    await Task.update(
      { taskId: object.taskId },
      { $set: object });
  },
  /**
   * ----{删除数据库中多余的任务}----
   * @param {Array} taskIds 所有存在的任务id
   * @returns {product} 返回删除信息
   * @author:oy
   */
  async removeTask(taskIds) {
    return await Task.remove({ 
      taskId: {$nin: taskIds }});
  },
  /**
   * ----{搜索指定项目下所有的任务}----
   * @param {String} projectId 项目id
   * @returns {object} 返回项目中所有任务
   * @author:oy
   */
  async findAll(projectId) {
    return await Task.find({projectId}).exec();
  }, 
  /**
   * ----{根据指定条件搜索数据库，返回查询结果和数量}----
   * @param {object} query 前端提供的参数，包括current,pageSize,value,scenarioId,\
   * @param {Array}  customFieldIds 自定义字段的id列表
   * @returns {Array} 包括list和count参数的列表
   * @author:oy
   */
  async serchTask(query, customFieldIds) {
    let result = [];
    let search = [];
    let skip = (query.current-1) * query.pageSize;
    for (let customFieldId of customFieldIds) {
      let object = {};
      object[`customfields.${customFieldId}`] = new RegExp(query.value, 'i');
      search.push(object);
    }
    let list = await Task.find({ scenarioFieldConfigId: query.scenarioId, $or: search})
      .sort({ update: -1 })
      .skip(skip)
      .limit(query.pageSize)
      .exec();
    let count = await Task.count({ scenarioFieldConfigId: query.scenarioId, $or: search})
      .exec();
    result.push(list, count);
    return result;
  },
};
