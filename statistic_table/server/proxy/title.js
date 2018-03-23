import { Title } from  '../models/model';

//封装title数据库操作方法
export default {
  /**
   * ----{根据指定任务类型id得到title}----
   * @param {String} scenarioFieldConfigId 任务类型id
   * @returns {object} 对应任务id下的title对象
   * @author:oy
   */
  async getTitleById(scenarioFieldConfigId) {
    try {
      return await Title.findOne({ scenarioFieldConfigId }).exec();
    } catch (error) {
      throw new Error(error);
    }

  },
  /**
   * ----{数据库中插入新的title}----
   * @param {object} object title对象
   * @returns {product} 返回插入后的修改信息
   * @author：oy 
   */
  async insertTitle(object) {
    let title = new Title(object);
    return await title.save();
  },
  /**
   * ----{更新数据库中的title对象}----
   * @param {object} object title对象
   * @returns {product} 返回更新后的修改信息
   * @author：oy
   */
  async updateTitle(object) {
    await Title.update(
      { scenarioFieldConfigId: object.scenarioFieldConfigId },
      { $set: object });
  },
  /**
   * ----{删除数据库中多余的title对象}----
   * @param {Array} scenarioFieldConfigId 存在的所有任务类型id表
   * @returns {product} 返回删除后的修改信息 
   * @author:oy
   */
  async removeTitle(scenarioFieldConfigId) {
    return await Title.remove({ 
      scenarioFieldConfigId: {$nin: scenarioFieldConfigId }});
  },
  /**
   * ----{根据指定的项目id获取title对象集}----
   * @param {String} projectId 项目id
   * @returns {object} 返回查询得到的title对象集 
   * @author:oy
   */
  async findAll(projectId) {
    return await Title.find({projectId}).exec();
  },
};
