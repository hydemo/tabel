import fs from 'fs';
import Xlsx from '../proxy/xlsx';
import logger from '../common/logger';


export default {
  async downXlsx(req, res, next) {
    const { scenarioId } = req.query;
    let result = await Xlsx.downXlsx(scenarioId);
    console.log(result);
    let disposition =`attachment; filename=${encodeURI(result.filename)}`;
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': disposition
    });
    let stream = await fs.createReadStream(result.path, { flags: 'r' });
    stream.pipe(res);
    stream
      .on('end', () => {
        return res.send();
      })
      .on('error', err => {
        logger.error('error=', err);
      });
  },

  async downxlsxs(req, res, next) {
    let result =await Xlsx.downXlsx(req.query.scenarioId);
    let disposition =`attachment; filename=${encodeURI(result.filename)}`;
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': disposition
    });
    let stream = fs.createReadStream(result.filename);
    stream.pipe(res);
    stream
      .on('end', () => {
        return res.send();
      })
      .on('error', err => {
        logger.error('error=', err);
      });
  }
};
