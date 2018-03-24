import xlsx from 'xlsx';
import Title from './title';
import Task from './task';
import moment from 'moment';


export default {
  async downXlsx(scenarioId) {
    let title = await Title.getTitleById(scenarioId);
    let _headers = [];
    let _headerIds = [];
    console.log(title);
    for (let key in title.titleFields) {
      _headers.push(title.titleFields[key]);
      _headerIds.push(key);
    }
    console.log('headerIds', _headerIds);
    let tasks = await Task.getTaskByScenarioId(scenarioId);
    let _data = [];
    for (let task of tasks) {
      _data.push(task.customfields)
    }
    let headers = _headers
      .map((v, i) => 
        Object.assign({}, {v: v, position: String.fromCharCode(65+i) + 1 }))
      .reduce((prev, next) => 
        Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
    let data = _data
      .map((v, i) => _headerIds.map((k, j) => 
        Object.assign({}, { v: v[k], 
          position: String.fromCharCode(65+j) + (i+2) })))
      .reduce((prev, next) => prev.concat(next))
      .reduce((prev, next) => Object
        .assign({}, prev, {[next.position]: {v: next.v}}), {});
    let output = Object.assign({}, headers, data);
    let outputPos = Object.keys(output);
    let ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;
    let workbook = { SheetNames: [`${title.scenarioFieldName}`], Sheets: {}}
    workbook.Sheets[`${title.scenarioFieldName}`] = 
      Object.assign({}, output, { '!ref': ref });
    await xlsx.writeFile(workbook,
      `${moment().format('YYYY-MM-DD')}${title.scenarioFieldName}.xlsx`);
    let filename =  
    `${moment().format('YYYY-MM-DD')}${title.scenarioFieldName}.xlsx`;
    return { filename: filename }
  },
}
