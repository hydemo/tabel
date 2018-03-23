import express from 'express';
import bodyParser from 'body-parser';
import log4js from 'log4js';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';
import compress from 'compression';
import './models/db';
import routers from './routers';
import config from 'config';
import {http_log, logger} from './common/logger';
import test from './controller/test'


console.log('config', config);
const app = express();
//实现跨域请求
app.use(cors());
//打印log信息
app.use(log4js.connectLogger(logger('http'), {level: 'info'}));
//设置bodyParser
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}));
//设置view
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'html');

app.use(http_log);
//设置cookie
app.use(cookieParser(config.session_secret));

app.use(compress());
//通过redis保存session
const RedisStore = connectRedis(session);
app.use(
  session({
    secret: config.session_secret,
    store: new RedisStore(config.redis),
    resave: true,
    saveUninitialized: true
  })
);
test.operation();
app.use('/', routers);

// 处理404
app.use((req, res, next) => {
  res.status(404).send(404);
});

// 处理500
app.use((err, req, res, next) => {
  logger('error').error('throw error:', err);

  const status = err.statusCode || err.status || 500;

  res.sendstatus(status).json({message: new Error(err).message});
})
//处理未捕获的错误
process.on('unhandledRejection', err => {
  logger('error').error('throw error:', err);
});

const port = process.env.HTTP_PORT || config.port;
//监听端口
app.listen(port, () => {
  logger('http').info(`${config.name} listening on port`, config.port);
  logger('http').info(`God bless love....`);
  logger('http').info(`You can debug your app with
   http://${config.host}:${config.port}`);
  logger('http').info(``);
});
