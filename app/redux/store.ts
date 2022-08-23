import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../feature/counter/counterRedux';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../saga';

const sagaMiddleware = createSagaMiddleware();
// const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware];

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({thunk: false}).prepend(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
