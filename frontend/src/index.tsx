import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import { initializeStateFromLocalStorage } from './features/userSlice';
import { clearUserData } from './features/adminSlice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const storedToken = localStorage.getItem("user");

if (storedToken) {
  store.dispatch(initializeStateFromLocalStorage(storedToken));
} else {
  store.dispatch(clearUserData())
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
