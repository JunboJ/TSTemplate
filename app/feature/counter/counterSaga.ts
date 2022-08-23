import {call, put} from 'redux-saga/effects';
import {asyncFetchRemote} from './counterRedux';

const dummyApiCall = (): Promise<number> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(13);
    }, 3000);
  });

export function* fetchRemoteCount() {
  try {
    const remoteValue: number = yield call(dummyApiCall);
    // yield put(updateFromRemote(remoteValue));
    yield put(asyncFetchRemote.successAction(remoteValue));
  } catch (err) {
    yield;
  }
}
