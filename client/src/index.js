import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './components/App';
import rootReducer from './reducers';

import 'semantic-ui-less/semantic.less';
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  )

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );