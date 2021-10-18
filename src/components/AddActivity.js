import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const AddActivity = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const token = props.token;
    const getActivities = props.getActivities;
    let history = useHistory();

    return <>
        <div className="card">
            <div className='newPost'>
                <form onSubmit={ async (event) => {
                    await event.preventDefault();
                    fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            name: name,
                            description: description
  })
}).then(response => response.json())
  .then(result => {
    getActivities();
  })
  .catch(console.error);

  history.push("/activities");          
            }}>
                    <input type='text' placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}></input>
                    <input type='text' placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)}></input>
                    <button className="messageBttn">Add Activity</button>
                    
                </form>
            </div>
        </div>
      </>
}

export default AddActivity;