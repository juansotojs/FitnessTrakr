import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const AddRoutine = (props) => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const token = props.token;
    const getMyRoutines = props.getMyRoutines;
    let history = useHistory();

    return <>
        <div className="card">
            <div className='newPost'>
                <form onSubmit={ async (event) => {
                    await event.preventDefault();
                    fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            name: name,
                            goal: goal,
                            isPublic: true
  })
}).then(response => response.json())
  .then(result => {
    getMyRoutines();
  })
  .catch(console.error);

  history.push("/routines");          
            }}>
                    <input type='text' placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}></input>
                    <input type='text' placeholder="Goal" value={goal} onChange={(event) => setGoal(event.target.value)}></input>
                    <button className="messageBttn">Add Routine</button>
                    
                </form>
            </div>
        </div>
      </>
}

export default AddRoutine;