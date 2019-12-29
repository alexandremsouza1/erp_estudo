import React from "react";

import ReactDOM from "react-dom";
import '../../client/node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import '../node_modules/semantic-ui-css/semantic.min.css'
import '../node_modules/notyf/notyf.min.css'; 

import AdminLayout from "layouts/Admin.jsx";
import { Provider } from 'react-redux';
import { store } from './store';
import CallApiAnuncio from './modules/components/CallApi/CallApiAnuncio'
import CallApiClient from './modules/components/CallApi/CallApiClient'



ReactDOM.render(

    <Provider store={store}>
      
      <CallApiAnuncio/>
      <CallApiClient/>

      <BrowserRouter>
        <Switch>
          <Route path="/admin" render={props => <AdminLayout {...props} />} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </BrowserRouter>
    </Provider>,
  
    document.getElementById("root")
  
  );