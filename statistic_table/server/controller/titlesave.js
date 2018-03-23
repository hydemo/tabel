import _ from 'lodash';
import Title from '../proxy/title';

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
   * ----{封装titleField}----
   * @param {object} scenarioCustomfields 任务类型自定义字段
   * @param {object} projectFields 项目自定义字段
   * @returns {object} 封装好的titleField对象
   * @author:hy 
   */
  updateTitleFields(scenarioCustomfields, projectFields) {
    try {
      let titleFields = {};
      scenarioCustomfields.map(val => {
        if (val._customfieldId){ 
          let field = _.find(projectFields, {
            _customfieldId: val._customfieldId
          });
          if (field.type === 'date') {
            titleFields[`${val._customfieldId}_date`] = field.name;
          } else {
            titleFields[`${val._customfieldId}`] = field.name;
          }
        }
      });       
      return titleFields;
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * ----{通过自定义字段id获取对应的自定义字段名称并封装}----
   * @param {object} scenarioFields 全部任务类型
   * @param {object} projectFields 项目自定义字段
   * @returns {object} 返回封装好的titles
   * @author:oy
   */
  async group(scenarioFields, projectFields) {
    let titles = [];
    if (!scenarioFields) {
      return [];
    }
    try {
      for (let scenarioField of scenarioFields) {
        if(scenarioField.scenariofields && 
          scenarioField.scenariofields.length) {
          let titleFields = await this.updateTitleFields(
            scenarioField.scenariofields, projectFields);
          let object = {
            projectId: scenarioField._projectId,
            scenarioFieldConfigId: scenarioField._id,
            scenarioFieldName: scenarioField.name,
            scenarioUpdate: scenarioField.updated,
            titleFields: titleFields
          };
          titles.push(object);          
        }
      }      
    } catch (err) {
      throw new Error(err);
    }
    return titles;
  },
  /**
   * ----{通过封装好的titles更新数据库中}----
   * @param {object} scenarioFields 全部任务类型
   * @param {object} projectFields 项目自定义字段
   * @returns {void} promise
   * @author:oy
   */
  async updateTitle(scenarioFields, projectFields) {
    try {
      let titles = await this.group(scenarioFields, projectFields);
      if (scenarioFields.length === 0) {
        return scenarioFields;
      }
      for (let title of titles) {
        let bool = await Title.getTitleById(title.scenarioFieldConfigId);
        if(scenarioFields && title.scenarioUpdate) {
          title.scenarioUpdate = new Date(title.scenarioUpdate).getTime();
        } else {
          title.scenarioUpdate = 0
        }
        if (bool) {
          await Title.updateTitle(title);
        } else {
          await Title.insertTitle(title);
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  }, 
}
