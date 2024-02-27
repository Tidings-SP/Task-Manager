import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(result => {
        console.log(result);
        fetchTasks(); // Fetch updated tasks after deletion
      })
      .catch(err => console.log(err));
  }
  

  const fetchTasks = () => {
    axios.get('http://localhost:3001/get')
      .then(result => setTasks(result.data))
      .catch(err => console.log(err));
  }

  const handleEdit = (id) => {
    setEditingTaskId(id);
    const taskToEdit = tasks.find(task => task._id === id);
    setEditedTask(taskToEdit.task);
  }

  const handleUpdate = (id, updatedTask) => {
    axios.put(`http://localhost:3001/update/${id}`, { task: updatedTask })
      .then(result => {
        console.log(result);
        fetchTasks();
      })
      .catch(err => console.log(err));
    setEditingTaskId(null);
    setEditedTask('');
  }

  return (
    <div className='home'>
      <h2>Task Manager</h2>
      <Create fetchTasks={fetchTasks} />
      {tasks.length === 0 ?
        <div>
          <h2>No Task Found, Feel free to add new task!</h2>
        </div>
        :
        tasks.map((task) => (
          <div className='task' key={task._id}>
            {editingTaskId === task._id ?
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
              />
              :
              <div>{task.task}</div>
            }
            <div className='icon'>
              {editingTaskId === task._id ?
                <button onClick={() => handleUpdate(task._id, editedTask)}>Update</button>
                :
                <FaEdit onClick={() => handleEdit(task._id)} />
              }
              <FaTrash onClick={() => handleDelete(task._id)} />
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Home;
