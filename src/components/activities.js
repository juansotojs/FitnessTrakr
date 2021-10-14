import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


const Activities = (props) => {
    const activities = props.activities;
    const setPosts = props.setPosts;
    const token = props.token;
    const code = props.code;
    const setActivities = props.setActivities;
    const setId = props.setId;
    let history = useHistory();

    async function getActivities() {
      fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
        .then(result => {
            setActivities(result);
            console.log("activities", activities);
        })
        .catch(console.error);

        //const request = await fetch('https://strangers-things.herokuapp.com/api/2105-SJS-RM-WEB-PT/posts');
        //const response = await request.json();
        //setPosts(response.data.posts);
    }
    //useEffect(() => getRoutines(), []);
    getActivities();
    
    return <>
    <BrowserRouter>
    <div className='posts'>
      <div className='status'>
        <h1>Activities</h1>
        <input type='text' placeholder='Search Activities'></input>
        { token ? 
        <div className='link'>
        <Link to='/posts/newpost' className='aType'>Add Post</Link>
      </div>
       : null}
      </div>

      <Route exact path="/activities">
      <div className="cards">
      {activities.map((activity, idx) => 
        <div key={idx} className="card">
          <div className='card-info'>
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
    
    
    </div>
    </BrowserRouter>
    </>
}

export default Activities;