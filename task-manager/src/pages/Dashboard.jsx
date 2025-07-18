import { useEffect, useState } from 'react';
import { fetchTasks, addTask, deleteTask, updateTask } from '../api';
import { useNavigate, Link } from 'react-router-dom';


function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });

  const loadTasks = async () => {
    const { data } = await fetchTasks();
    setTasks(data);
  };

 const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    loadTasks();

  }, []);

  const handleAdd = async () => {
    if (!form.title) return;
    await addTask(form);
    setForm({ title: '', description: '' });
    loadTasks();
    
  };

  return (

<>
    <div className="navbar bg-base-100 shadow-sm bg-neutral text-neutral-content">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl"> Welcome, {user?.firstName} {user?.lastName}</a>
  </div>
  <div className="flex-none">
     <button onClick={handleLogout} className="text-neutral-content btn bg-neutral">
           
            Log out
             </button>
     </div>
</div>




    <div className="p-6">
      <div className="card bg-base-100 p-5 shadow-xl max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-4">Task Manager</h2>
        <input className="input input-bordered mb-2" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input className="textarea textarea-sm mb-2 mt-3 " placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      
        <button className="btn btn-neutral w-24 mb-4" onClick={handleAdd}>Add Task</button>

        <ul className="space-y-2">





          {tasks.map(task => (
            <li key={task._id} className="flex justify-between items-center border p-2 rounded">
              <div>
                <h4 className="font-semibold">{task.title}</h4>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-sm" onClick={() => updateTask(task._id, { completed: !task.completed }).then(loadTasks)}>{task.completed ? 'Undo' : 'Done'}</button>
                <button className="btn btn-sm btn-error" onClick={() => deleteTask(task._id).then(loadTasks)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    </>
  );
}

export default Dashboard;