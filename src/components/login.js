import React, { useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const username = props.username;
  const setUsername = props.setUsername;
  const password = props.password;
  const setPassword = props.setPassword;
  const setToken = props.setToken;
  const token = props.token;
  let history = useHistory();
    const existing = (props) => {
      fetch('https://fitnesstrac-kr.herokuapp.com/api/users/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
    })
  }).then(response => response.json())
    .then(result => {
     localStorage.setItem('token', result.token);
     history.push("/home");
   })
  .catch(console.error);
  }
    const register = (props) => {
      fetch('https://fitnesstrac-kr.herokuapp.com/api/users/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
  })
      }).then(response => response.json())
          .then(result => {
           console.log('register', result);
           if(result.token){
             localStorage.setItem('token', result.token);
             history.push("/home");
           } 
          })
    }

    useEffect(() => {
      const foundToken = localStorage.getItem('token');
      if(foundToken){
        setToken(foundToken);
      }
    }, []);

    return <> 
    <BrowserRouter>
    <div className='posts'>
      <div className='status'>
    <h1 className='section'>Login/Register</h1>
    </div>
    <div className="cards">
        <div className="card">
        <div className="toggle">
        <Link to='/login/signin' className="opt">Login</Link>
        <Link to='/login/register' className="opt">Register</Link>
        </div>
        <div>
        <Route exact path="/login/register">
          <div className="card-info">
        <form className='field' onSubmit={ async (event) => {
            await event.preventDefault();
            await register();
            setUsername('');
            setPassword('');
            }}>
          <div className="usernameInput">
            <p>Username</p>
            <input type ="text" placeholder="Username" className="txtBox" value={username} onChange={(event) => setUsername(event.target.value)}></input>
          </div>
          <div className="passwordInput">
              <p>Password</p>
            <input type ="password" placeholder="Password" className="txtBox" value={password} onChange={(event) => setPassword(event.target.value)}></input>
          </div>
          <p className="youAgree">By submitting this form I agree to the terms and conditions.</p>
          <button type="submit" className="loginBttn">REGISTER</button>
          </form>
          </div>
        </Route>
        <Route exact path="/login/signin">
        <form className='field' onSubmit={ async (event) => {
            await event.preventDefault();
            await existing();
            setUsername('');
            setPassword('');
            }}>
          <div className="fillOut">
          <div className="usernameInput">
            <p>Username</p>
            <input type ="text" placeholder="Username" className="txtBox" value={username} onChange={(event) => setUsername(event.target.value)}></input>
          </div>
          <div className="passwordInput">
              <p>Password</p>
            <input type ="password" placeholder="Password" className="txtBox" value={password} onChange={(event) => setPassword(event.target.value)}></input>
          </div>
          <p className="youAgree">By submitting this form I agree to the terms and conditions.</p>
          <button type="submit" className="loginBttn">LOGIN</button>
          </div>
          </form>
        </Route>
        </div>
          </div>
    </div>
    </div>
      </BrowserRouter>
      </>
}

export default Login;