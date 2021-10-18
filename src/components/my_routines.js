import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import AddRoutine from './AddRoutine';

const MyRoutines = (props) => {
    const myRoutines = props.myRoutines;
    const token = props.token;
    const setMyRoutines = props.setMyRoutines;
    let userObj = {};

    async function getMe(){
        fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
     },
    }).then(response => response.json())
        .then(result => {
        userObj = result;
         })
    .catch(console.error);
    }
    getMe();
    async function getMyRoutines() {
     
      fetch(`https://fitnesstrac-kr.herokuapp.com/api/users/${userObj.username}/routines`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.json())
        .then(result => {
            setMyRoutines(result);
        })
        .catch(console.error);
    }
    useEffect(() => getMyRoutines(), []);
    
    return <>
    <BrowserRouter>
    <div className='posts'>
      <div className='status'>
        <h1>My Routines</h1>
        { token ? 
        <div className='link'>
        <Link to='/routines/newroutine' className='aType'>Add Routine</Link>
      </div>
       : null}
      </div>

      <Route exact path="/my_routines">
      <div className="cards">
      {myRoutines.map((routine, idx) => 
        <div key={idx} className="card">
          <div className='card-info'>
          <h2>{routine.name}</h2>
          <div className="info">
          <div className="subInfo">
          <h3>Goal: </h3><p className="infoVal">{routine.goal}</p></div>
          <div className="subInfo">
        <div className="activ">
          <h3>Activities: </h3> {routine.activities.map((activity) => <>
          <h3>Name: </h3><p>{activity.name}</p>
          <h3>Description: </h3><p>{activity.description}</p>
          <h3>Duration: </h3><p>{activity.duration}</p>
          <h3>Count: </h3><p>{activity.count}</p>
          </>
          )}
          </div>
          </div>
          <div className="subInfo">
          <h3>Creator: </h3> <p className="infoVal">{routine.creatorName}</p></div>
          </div>
          </div>
        </div>
      )
    }
    </div>
    </Route>
    <Route exact path="/routines/newroutine">
    <div className="cards">
      <AddRoutine token={token} getMyRoutines={getMyRoutines}/>
    </div>
    </Route>
    
    </div>
    </BrowserRouter>
    </>
}

export default MyRoutines;