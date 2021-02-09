import {createStore, compose, applyMiddleware,  StoreEnhancer} from 'redux';
import thunk from 'redux-thunk';
import {staticDataReducer} from './reducers/static-data';

declare global {
  interface Window {
    process?: Record<string, any>;
    /* eslint-disable-next-line no-undef */
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface RootState {
  offices: [],
  sectors: [],
  static: null
}


// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose: <Ext0, StateExt0>(
  f1: StoreEnhancer<Ext0, StateExt0>
) => StoreEnhancer<Ext0, StateExt0> = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(staticDataReducer,
  devCompose(applyMiddleware(thunk as any)));

