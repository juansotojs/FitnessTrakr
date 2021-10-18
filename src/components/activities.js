import React, { useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import AddActivity from './AddActivity';


const Activities = (props) => {
    const activities = props.activities;
    const token = props.token;
    const setActivities = props.setActivities;

    async function getActivities() {
      fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
        .then(result => {
            setActivities(result);
        })
        .catch(console.error);

    }
    useEffect(() => getActivities(), []);
    
    
    return <>
    <BrowserRouter>
    <div className='posts'>
      <div className='status'>
        <h1>Activities</h1>
        { token ? 
        <div className='link'>
        <Link to='/activities/newactivity' className='aType'>Add Activity</Link>
      </div>
       : null}
      </div>

      <Route exact path="/activities">
      <div className="cards">
      {activities.map((activity, idx) => 
        <div key={idx} className="card">
          <div className='card-info'>
          <h3>Name: </h3>
          <h2>{activity.name}</h2>
          <div className="info">
          <div className="subInfo">
          <h3>Description: </h3><p className="infoVal">{activity.description}</p></div>
          </div>
          </div>
          </div>
          )}
    
          
    </div>
    </Route>
    <Route exact path="/activities/newactivity">
    <div className="cards">
      <AddActivity token={token} getActivities={getActivities}/>
    </div>
    </Route>
    </div>
    </BrowserRouter>
    </>
}

export default Activities;