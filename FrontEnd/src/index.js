import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AdminLogin from './AdminLogin';
import AdminPage from './AdminPage';
import Home from './Home';
import { Route, BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <BrowserRouter>
    <App/>
    <Route exact path="/" component={Home} />
    <Route path="/signIn" component={SignIn} />
    <Route path="/signUp" component={SignUp} />
    <Route path="/AdminLogin" component={AdminLogin} />
    <Route path="/AdminPage" component={AdminPage} />
  </BrowserRouter>,
  document.getElementById('root')
);
