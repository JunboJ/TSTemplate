import {ActionReducerMapBuilder, createAction} from '@reduxjs/toolkit';
import {RootState} from './store';

export enum ActionStatus {
  idle = 0,
  pending,
  success,
  failure,
}

enum ActionEnums {
  requestPath = '/request',
  successPath = '/success',
  failurePath = '/failure',
}

export const createAsyncSelector = (
  selector: (state: RootState) => ActionStatus,
) => {
  return (state: RootState) => {
    const asyncState = selector(state);

    return {
      isIdle: () => asyncState === ActionStatus.idle,
      isPending: () => asyncState === ActionStatus.pending,
      isSuccess: () => asyncState === ActionStatus.success,
      isFailure: () => asyncState === ActionStatus.failure,
    };
  };
};

export const createAsyncSlice = <
  TRequestPayload,
  USuccessPayload,
  VFailurePayload,
>(
  type: string,
) => {
  const requestAction = createAction<TRequestPayload>(
    `${type}${ActionEnums.requestPath}`,
  );
  const successAction = createAction<USuccessPayload>(
    `${type}${ActionEnums.successPath}`,
  );
  const failureAction = createAction<VFailurePayload>(
    `${type}${ActionEnums.failurePath}`,
  );

  const addAsyncMatcher = <
    TState extends {async: Record<string, ActionStatus>},
  >(
    builder: ActionReducerMapBuilder<TState>,
  ) => {
    // https://redux-toolkit.js.org/api/createReducer#multiple-case-reducer-execution
    builder
      .addMatcher(
        action => action.type.endsWith(ActionEnums.successPath),
        state => {
          state.async[type] = ActionStatus.success;
        },
      )
      .addMatcher(
        action => action.type.endsWith(ActionEnums.requestPath),
        state => {
          state.async[type] = ActionStatus.pending;
        },
      )
      .addMatcher(
        action => action.type.endsWith(ActionEnums.failurePath),
        state => {
          state.async[type] = ActionStatus.failure;
        },
      );

    return builder;
  };

  return {
    actions: {requestAction, successAction, failureAction},
    addAsyncMatcher,
  };
};

// #2
// export const createAsyncAction = <
//   TRequestPayload,
//   USuccessPayload,
//   VFailurePayload,
// >(
//   type: string,
// ): {
//   requestAction: PayloadActionCreator<TRequestPayload>;
//   successAction: PayloadActionCreator<USuccessPayload>;
//   failureAction: PayloadActionCreator<VFailurePayload>;
// } => {
//   const requestAction = createAction<TRequestPayload>(
//     `${type}${ActionEnums.requestPath}`,
//   );
//   const successAction = createAction<USuccessPayload>(
//     `${type}${ActionEnums.successPath}`,
//   );
//   const failureAction = createAction<VFailurePayload>(
//     `${type}${ActionEnums.failurePath}`,
//   );

//   return {requestAction, successAction, failureAction};
// };

// export const createAsyncReduer = <
//   TState extends {async: Record<string, ActionStatus>},
// >(
//   builder: ActionReducerMapBuilder<TState>,
//   asyncActionType: string,
// ) => {
//   builder
//     .addCase(`${asyncActionType}${ActionEnums.successPath}`, state => {
//       state.async[asyncActionType] = ActionStatus.success;
//     })
//     .addCase(`${asyncActionType}${ActionEnums.requestPath}`, state => {
//       state.async[asyncActionType] = ActionStatus.pending;
//     })
//     .addCase(`${asyncActionType}${ActionEnums.failurePath}`, state => {
//       state.async[asyncActionType] = ActionStatus.failure;
//     });
// };

// #1
// const matchAction = (action: AnyAction, typePath: ActionEnums) => {
//   const type = action.type as string;
//   return type.endsWith(typePath);
// };

// const isPendingAction = (action: AnyAction) =>
//   matchAction(action, ActionEnums.requestPath);
// const isSuccessAction = (action: AnyAction) =>
//   matchAction(action, ActionEnums.successPath);
// const isFailureAction = (action: AnyAction) =>
//   matchAction(action, ActionEnums.failurePath);

// const asyncReducer = createReducer(initialState, builder => {
//   builder
//     .addMatcher(isPendingAction, (state, action) => {
//       const baseType = (action.type as String).split('/')[0];
//       state[baseType] = 'pending';
//     })
//     .addMatcher(isSuccessAction, (state, action) => {
//       const baseType = (action.type as String).split('/')[0];
//       state[baseType] = 'success';
//     })
//     .addMatcher(isFailureAction, (state, action) => {
//       const baseType = (action.type as String).split('/')[0];
//       state[baseType] = 'falure';
//     });
// });

// export default asyncReducer;
