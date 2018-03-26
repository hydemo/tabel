import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import cookies from 'js-cookie';
import { actionType as homeReducer } from '../reducers/home.reducer';
import * as homeService from '../../services/home.service';

export const actionType = {
  login: 'home/login',
};

// login
export function* login({ payload: { query, history } }) {
  yield put({ type: homeReducer.loading, payload: true });
  const res = yield call(homeService.login, query);
  if (res) {
    const { token, userId } = res;
    cookies.set('token', token);
    cookies.set('userId', userId);
    history.push('/index');
  }
  yield put({ type: homeReducer.loading, payload: false });
}


export default function* root() {
  yield [
    takeLatest(actionType.login, login),
  ];
}
