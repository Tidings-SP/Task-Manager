import React, { useState } from 'react'
import axios from 'axios'

function Create() {
  const [task, setTask] = useState()

  const handleCreate = () => {
    axios.post('http://localhost:3001/create', {task: task})
    .then(res => {
      window.location.reload();
    })
    .catch(err => console.log(err))
  }
  return (
    <div className='create_form'>
      <input type='text' name='' id='' onChange={(e) => setTask(e.target.value)}/>
      <button type='button' onClick={handleCreate}>Create</button>
    </div>
  )
}

export default Create