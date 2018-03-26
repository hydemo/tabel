import React from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Login from '@/Login/Login';
import Index from '@/Index';

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/index',
    component: Index,
  },
];

export default (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/index" />
      {
        routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            render={props => (
              <route.component {...props} routes={route.routes} />
            )}
          />
        ))
      }
    </Switch>
  </BrowserRouter>
);
