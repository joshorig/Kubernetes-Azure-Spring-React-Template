import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomeContainer from './home-page/HomeContainer';

export default (
  <Switch>
    <Route path="/home" component={HomeContainer} />
    <Redirect from="*" to="home" />
  </Switch>
);
