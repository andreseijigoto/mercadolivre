import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import PageHome from './pages/Home';
import PageItemsList from './pages/ItemsList';
import PageItemsDetails from './pages/ItemsDetails';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact component={PageItemsDetails} path="/items/:id" />
        <Route exact component={PageItemsList} path="/items" />
        <Route component={PageHome} path="/" exact />
      </Switch>
    </Router>
  )
}

export default Routes;