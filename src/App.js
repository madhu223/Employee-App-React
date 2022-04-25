import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponet from './components/ListEmployeeComponet';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';

function App() {
  return (
    <div className='App'>
      <Router>
        <HeaderComponent />

        <div className='container'>
          <Switch>
            <Route path='/' exact component={ListEmployeeComponet}></Route>
            <Route path='/employees' component={ListEmployeeComponet}></Route>
            <Route
              path='/add-employee/:id'
              component={CreateEmployeeComponent}
            ></Route>
            <Route
              path='/view-employee/:id'
              component={ViewEmployeeComponent}
            ></Route>
            {/* <Route
              path='/update-employee/:id'
              component={UpdateEmployeeComponent}
            ></Route> */}
            {/* <ListEmployeeComponet /> */}
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
