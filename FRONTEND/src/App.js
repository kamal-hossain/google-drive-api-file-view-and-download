import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar1 from './components/layout/Navbar';
import Home from './components/layout/Home';
import Routes from './components/routing/Routes';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar1 />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
