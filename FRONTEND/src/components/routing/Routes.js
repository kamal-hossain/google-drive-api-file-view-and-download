import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Batch from '../semester/Batch';
import Course from '../semester/Course';
import Content from '../semester/Content';
import NotFound from '../layout/NotFound';
// import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <Fragment>
      {/* <Alert /> */}
      <Switch>
        <Route path="/batch/:folderid" component={Batch} />
        <Route path="/courses/:folderid" component={Course} />
        <Route path="/content/:folderid" component={Content} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Fragment>
  );
};

export default Routes;
