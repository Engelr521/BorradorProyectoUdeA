import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import React from 'react';
import Registro from './pages/Registro';
import Admin from './pages/Admin';
import Index from './pages/Index';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Vehiculos from './pages/Vehiculos';
import ForbidenComponent from './components/firbiden/ForbidenComponent';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const {isAuthenticated} = useAuth0 ();
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path ='/login' exact>
          <Login></Login>
        </Route>
        <Route path = '/registro' exact>
          <Registro></Registro>
        </Route>
        <Route path = '/admin' exact>
          <Admin></Admin>
        </Route>
        <Route path = '/vehiculos' exact>
          <Vehiculos></Vehiculos>
        </Route>
        <Route path = '/forbiden' exact>
          <ForbidenComponent></ForbidenComponent>
        </Route>
        <Route path = '/' exact>
          <Index></Index>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
