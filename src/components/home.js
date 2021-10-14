import React, { useEffect, useState } from 'react';

const Home = (props) => {
    const token = props.token;
    return <>
    <div className='posts'>
      <div className='status'>
    <h1 className='section'>Home</h1>
    </div>
    <div className="cards">
        <div className="card">
            <h1>Welcome to FitnessTrakr!</h1> 
            <p>Please login or register.</p>
        </div>
    </div>
    </div>
      </>
}

export default Home;