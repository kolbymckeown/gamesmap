import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import React from 'react'
// import { render } from 'react-dom'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import rootReducer from './reducers'
// import App from './components/App'
// import ReactDOM from 'react-dom';
// import reducers from './reducers'

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
