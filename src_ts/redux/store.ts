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


// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose: <Ext0, StateExt0>(
  f1: StoreEnhancer<Ext0, StateExt0>
) => StoreEnhancer<Ext0, StateExt0> = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Initializes the Redux store with a lazyReducerEnhancer (so that you can
// lazily add reducers after the store has been created) and redux-thunk (so
// that you can dispatch async actions). See the "Redux and state management"
// section of the wiki for more details:
// https://github.com/Polymer/pwa-starter-kit/wiki/4.-Redux-and-state-management
export const store = createStore(staticDataReducer,
  devCompose(applyMiddleware(thunk as any)));

