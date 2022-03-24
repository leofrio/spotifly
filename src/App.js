import React from 'react';
import Cabecalho from './components/Cabecalho';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FAQ from './components/pages/FAQ';

import SignUp from './components/pages/SignUp';

function App() {
  return (
    <>
      <Router>
        <Cabecalho />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/FAQ' component={FAQ} />
          <Route path='/sign-up' component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
