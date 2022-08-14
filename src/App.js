import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route path="/project-trybewallet" component={ Login } />
      <Route path="/carteira" component={ Wallet } />
      <Route path="/cadastrar" component={ Registration }/>
      <Route path="/*" component={ NotFound } />
    </Switch>
  );
}

export default App;
