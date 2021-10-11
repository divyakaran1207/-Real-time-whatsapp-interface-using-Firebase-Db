import React, {useState} from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import {BrowserRouter as Router,  Switch,Route } from 'react-router-dom'
import LogIn from './LogIn';
import { useStateValue } from './stateProvider';





function App() {
  const [{user}, dispatch] = useStateValue();

  return (
    <div className="app">   
    {!user ? (
      <LogIn/>
    ):(
      <div className='app_body'>
        <Router>
        <Sidebar />
          <Switch>          
            <Route path='/rooms/:roomid'>                 
            <Chat/>
            </Route>
            <Route path='/'>
            <Chat/>
            </Route>
          </Switch>
        </Router>
      </div>
    )}   
      
    </div>
  );
}

export default App;


 /* Project Console: https://console.firebase.google.com/project/whatsapp-clone-19b78/overview
Hosting URL: https://whatsapp-clone-19b78.web.app */