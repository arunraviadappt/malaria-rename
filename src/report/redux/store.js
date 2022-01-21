import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from './reducers/combineReducers';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createNetworkMiddleware } from 'react-native-offline';
import rootSaga from './sagas';
import { persistStore, persistReducer } from 'redux-persist'
import FSStorage, { DocumentDir } from 'redux-persist-fs-storage';
// import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
  timeout: 0,
  key: 'root',
  keyPrefix: '',
  storage: AsyncStorage,
  blacklist: ['network', 'selections']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();
const networkMiddleware = createNetworkMiddleware({
  queueReleaseThrottle: 200,
});

// const enhancer = composeWithDevTools(applyMiddleware(networkMiddleware, sagaMiddleware));
const enhancer = applyMiddleware(networkMiddleware, sagaMiddleware);

export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
