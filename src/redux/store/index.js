// store.js
// Import necessary Redux modules and middleware.
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from '../reducer/reducer'; // Import your root reducer
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/saga'; // Import your root saga
import storage from 'redux-persist/lib/storage';

// Create a Redux Saga middleware instance.
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store, passing in the root reducer and applying the Saga middleware.

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);
// Run the root Saga using the middleware.
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
// Export the configured Redux store.
export default store;

