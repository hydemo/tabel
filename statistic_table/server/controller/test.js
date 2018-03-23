import teambition from '../middlewares/teambition';
import config from 'config';
import titleSave from './titlesave';
import taskSave from './tasksave';
import Title from '../proxy/title';
import Task from '../proxy/task';
import id from '../middlewares/id';

export default {
  async operation() {
    try {
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
      return;
    } catch (err) {
      console.log(err);
    }
  },
}
