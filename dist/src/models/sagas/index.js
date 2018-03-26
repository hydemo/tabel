import { spawn } from 'redux-saga/effects';

import homeSaga from './home.saga';

export default function* rootSaga() {
  yield [
    spawn(homeSaga),
  ];
}

