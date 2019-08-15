declare global {
  interface Window {
    process?: Record<string, any>;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose; // eslint-disable-line
  }
}

import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
  Reducer,
  StoreEnhancer
} from 'redux';
import thunk, {ThunkMiddleware} from 'redux-thunk';
import {lazyReducerEnhancer} from 'pwa-helpers/lazy-reducer-enhancer.js';

import {CommonDataState} from './reducers/common-data';
import {CommonDataAction} from './actions/common-data';
import { PersonalizedDataState } from './reducers/personalized-data';
import { PersonalizedDataAction } from './actions/personalized-data';

// import {reducer, initial} from './mixins/redux-store-mixin';

// import {UserAction} from './actions/user.js';
// import {UserState} from './reducers/user.js';

// Overall state extends static states and partials lazy states.
export interface RootState {
  commonData?: CommonDataState;
  personalizedData?: PersonalizedDataState;
}

// could be more than one action AppAction | OtherAppAction ...
// TODO: remove any and find a way to fix generated ts-lint errors
export type RootAction = CommonDataAction | PersonalizedDataAction | any;

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose: <Ext0, Ext1, StateExt0, StateExt1>(
  //@ts-ignore
  f1: StoreEnhancer<Ext0, StateExt0>, f2: StoreEnhancer<Ext1, StateExt1>
  //@ts-ignore
) => StoreEnhancer<Ext0 & Ext1, StateExt0 & StateExt1> =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Initializes the Redux store with a lazyReducerEnhancer (so that you can
// lazily add reducers after the store has been created) and redux-thunk (so
// that you can dispatch async actions). See the "Redux and state management"
// section of the wiki for more details:
// https://github.com/Polymer/pwa-starter-kit/wiki/4.-Redux-and-state-management
export const store = createStore(
  // reducer,
  state => state as Reducer<RootState, RootAction>,
  devCompose(
    lazyReducerEnhancer(combineReducers),
    applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>))
);

// Initially loaded reducers.
// @ts-ignore
// store.addReducers({
//   commonData
// });

/**
 * IMPORTANT!
 * For any other reducers use lazy loading like this (in the element that needs the reducer)
 *    import counter from '../reducers/x-reducer.js';
 *    store.addReducers({
 *       xReducer
 *   });
 */