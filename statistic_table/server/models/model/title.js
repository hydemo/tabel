import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  //项目id
  projectId: { type: String },
  //任务分组id
  scenarioFieldConfigId: { type: String },
  //任务分组名称
  scenarioFieldName: { type: String },
  //更新时间
  scenarioUpdate: { type: Number },
  //标题
  titleFields: {type: mongoose.Schema.Types.Mixed}
});

export default mongoose.model('title', schema);
