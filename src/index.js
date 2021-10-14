import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './components/home';
import Routines from './components/routines';
import Activities from './components/activities';
import Login from './components/login';


const App = () => {
  const [routines, setRoutines] = useState([]);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [comment, setComment] = useState('');
  const [activities, setActivities] = useState('');
  const [id, setId] = useState('');
  
  return <>
  <BrowserRouter>
  <div className='container'>
  <div className='dashboard'>
    <div className='user'>
    <h3>User Name</h3>
    <p>Pro Member</p>
    </div>
    <div className='links'>
      <div className='link'>
        <Link to='/home' className='aType'>Home</Link>
      </div>
      <div className='link'>
        <Link to='/routines' className='aType'>Routines</Link>
      </div>
      <div className='link'>
        <Link to='/my_routines' className='aType'>My Routines</Link>
      </div>
      <div className='link'>
        <Link to='/activities' className='aType'>Activities</Link>
      </div>
      <div className='link'>
        { token ? <a href="#"  onClick={(event) => {
        event.preventDefault();
        console.log(token);
        setToken('')}}>Logout</a> : <Link to='/login' className='lText'>Login</Link>}
      </div>
    </div>
    <div className='pro'>
      <h2 className='ad'>Sign up to create a post.</h2>
    </div>
  </div>
    <Route exact path="/home"> 
          <Home />
    </Route>
    <Route exact path="/routines">
          <Routines setRoutines={setRoutines} routines={routines}/>
    </Route>
    <Route exact path="/my_routines">

    </Route>
    <Route exact path="/activities">
          <Activities activities={activities} setActivities={setActivities} />
    </Route>
    <Route exact path="/login">
          <Login token={token} setToken={setToken} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
    </Route>
  </div>
  </BrowserRouter>
  
  </>
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
