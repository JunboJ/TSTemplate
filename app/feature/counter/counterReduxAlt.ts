import {ActionCreator, ActionCreatorWithOptionalPayload, AnyAction, AsyncThunk, createAction, createReducer, PrepareAction} from '@reduxjs/toolkit';
import { AnyObject } from 'immer/dist/internal';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>

const createAsyncAction = <TRequestPayload, USuccessPayload, VFailurePayload>(
  type: string,
) => {
  const requestAction = createAction<PrepareAction<TRequestPayload>>(`${type}/request`, (payload: TRequestPayload) => {
    return {
        payload,
        meta: {
            baseType: type
        }
    }
  });
  const successAction = createAction<PrepareAction<USuccessPayload>>(`${type}/success`, (payload: USuccessPayload) => {
    return {
        payload,
        meta: {
            baseType: type
        }
    }
  });
  const failureAction = createAction<PrepareAction<VFailurePayload>>(`${type}/failure`, (payload: VFailurePayload) => {
    return {
        payload,
        meta: {
            baseType: type
        }
    }
  });

  return {requestAction, successAction, failureAction};
};

const isPendingAction = (action: AnyAction) => {
    const type = action.type as string
    return type.endsWith('request')
}

const counterReducer = createReducer(initialState, (builder) => {
    builder.addMatcher(isPendingAction, (state, action: AnyAction) => {
        const baseType = (action.type as String).split('/')[0];
        state[baseType]
    })
})

const actions = 

export actions;
export default counterReducer