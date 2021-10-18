import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";


const Routines = (props) => {
    const routines = props.routines;
    const setRoutines = props.setRoutines;

    async function getRoutines() {
      fetch('https://fitnesstrac-kr.herokuapp.com/api/routines', {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
        .then(result => {
            setRoutines(result);
        })
        .catch(console.error);

    }
    useEffect(() => getRoutines(), []);
    
    return <>
    <BrowserRouter>
    <div className='posts'>
      <div className='status'>
        <h1>Routines</h1>
      </div>

      <Route exact path="/routines">
      <div className="cards">
      {routines.map((routine, idx) => 
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
      )}
    </div>
    </Route>

    </div>
    </BrowserRouter>
    </>
}

export default Routines;