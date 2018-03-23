import { User } from '../models/model';

//封装user数据库操作方法
export default {
  /**
   * ----{根据指定的用户id得到用户对象}----
   * @param {String} userId 用户id
   * @returns {object} 返回查询到的user对象
   * @author:oy
   */
  async getUserById(userId) {
    return await User.findById(userId).exec();
  },
  /**
   * ----{更新数据库中的用户对象}----
   * @param {object} user user对象
   * @returns {product} 返回更新后的修改信息
   * @author:oy
   */
  async updateUser(user) {
    return await User.findOneAndUpdate({_id: user._id}, user, {
      upsert: true,
      setDefaultsOnInsert: true,
      new: true
    }).exec();
  }
};
