import React, { useEffect } from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Landing from './components/Landing';
import Register from './components/Register';
import Login from './components/Login';
import {loadUser} from './actions/authActions';
import {Router, Route} from "react-router-dom";
import history from './history';
import './main.css';
import Navigation from './components/Navigation'

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  })

  return <div style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: '#DBE4EE', display: 'flex', flexDirection: 'column'}}>
      <Provider store={store}>
      <Navigation />
        <Router history={history}>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Router>
      </Provider> 
    </div>
}

export default App;
