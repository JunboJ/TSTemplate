import {takeLatest} from 'redux-saga/effects';
import {asyncFetchRemote} from '../feature/counter/counterRedux';
import {fetchRemoteCount} from '../feature/counter/counterSaga';

function* rootSaga() {
  yield takeLatest(asyncFetchRemote.requestAction, fetchRemoteCount);
}

export default rootSaga;
