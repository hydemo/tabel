import mongoose from 'mongoose';


const schema = new mongoose.Schema({
  //项目Id
  projectId: { type:String },
  //任务id
  taskId: { type:String },
  //任务名称
  taskName: {type: String },
  //任务分组id
  scenarioFieldConfigId: { type: String },
  //更新时间
  update: { type: Number },
  //自定义字段
  customfields: {type: mongoose.Schema.Types.Mixed}
});

export default mongoose.model('task', schema);
