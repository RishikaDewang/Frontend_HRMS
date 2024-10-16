import { createRoot } from 'react-dom/client';

// third party
import {  HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import  store, { persistor }  from 'redux/store';

// style + assets
import 'assets/scss/style.scss';
// import config from './config';

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <HashRouter >
      <App />
    </HashRouter>
    </PersistGate>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
