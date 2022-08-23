import {
  // createAction,
  // createReducer,
  createSlice,
  // createSlice,
  // PayloadAction,
} from '@reduxjs/toolkit';
import {
  ActionStatus,
  createAsyncSelector,
  // createAsyncAction,
  // createAsyncReduer,
  createAsyncSlice,
} from '../../redux/asyncReducer';
import {RootState} from '../../redux/store';

enum ActionTypes {
  increment = 'increment',
  decrement = 'decrement',
  incrementByAmount = 'incrementByAmount',
  fetchRemoteValue = 'fetchRemoteValue',
}

interface CounterState {
  value: number;
  async: {
    [ActionTypes.fetchRemoteValue]: ActionStatus;
  };
}

const initialState: CounterState = {
  value: 0,
  async: {
    fetchRemoteValue: ActionStatus.idle,
  },
};

// const increment = createAction(ActionTypes.increment);
// const decrement = createAction(ActionTypes.decrement);
// const incrementByAmount = createAction<number>(ActionTypes.incrementByAmount);

const {actions: asyncFetchRemote, addAsyncMatcher: addMatcherFetchRemote} =
  createAsyncSlice<number, number, string>(ActionTypes.fetchRemoteValue);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(asyncFetchRemote.successAction, (state, action) => {
      state.value = action.payload;
    });
    addMatcherFetchRemote(builder);
  },
});

const {increment, decrement, incrementByAmount} = counterSlice.actions;

export {asyncFetchRemote, increment, decrement, incrementByAmount};
export default counterSlice.reducer;

export const counterSelector = (state: RootState) => state.counter.value;

export const asyncFetchRemoteSelector = createAsyncSelector(
  (state: RootState) => state.counter.async[ActionTypes.fetchRemoteValue],
);
