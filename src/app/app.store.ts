import {
  Action,
  applyMiddleware,
  compose,
  createStore,
  Middleware,
  Store,
  StoreEnhancer,
} from 'redux';
import * as reduxLogger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import persistCombineReducers from 'redux-persist/es/persistCombineReducers';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import { rootEpic, EpicDependencies } from '../app/app.epics';
import { reducers, StoreState } from './app.reducers';
import { isProduction } from '../+shared/logic/envs/envs';

const epicMiddleware = createEpicMiddleware<Action, Action, StoreState>();
const middlewares: Middleware[] = [epicMiddleware];
let enhancer: StoreEnhancer;

if (isProduction()) {
  enhancer = compose(applyMiddleware(...middlewares));
} else {
  const logger: Middleware = reduxLogger.createLogger({ collapsed: true });
  middlewares.push(logger);
  const reduxDevToolsExtensionCompose = window
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = reduxDevToolsExtensionCompose
    ? reduxDevToolsExtensionCompose({
      trace: true,
      traceLimit: 25,
    })
    : compose;
  enhancer = composeEnhancers(applyMiddleware(...middlewares));
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const reducer = persistCombineReducers(persistConfig, {
  ...reducers,
});

export const configureStore = () => {
  const store: Store = createStore(reducer, enhancer);
  const persistor = persistStore(store);
  const epicDependencies: EpicDependencies = {
    dispatch: store.dispatch,
  };

  epicMiddleware.run((action$, state$) => rootEpic(action$, state$, epicDependencies));

  return {
    persistor,
    store,
  };
};

export const { store, persistor } = configureStore();
