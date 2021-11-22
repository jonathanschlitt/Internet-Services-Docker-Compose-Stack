import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // fetch data from json-server
  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:7777/api/data/tasks');

    const data = res.data;

    return data;
  };

  // fetch single task
  const fetchTask = async (id) => {
    const res = await axios.get(`http://localhost:7777/api/data/tasks/${id}`);

    const data = res.data;

    return data;
  };

  // add Task
  const addTask = async (task) => {
    const newTask = { ...task };

    const res = await axios.post(
      'http://localhost:7777/api/data/tasks',
      newTask
    );

    //console.log(task);
    setTasks([res.data, ...tasks]);
  };

  // delete Task
  const deleteTask = async (id) => {
    console.log('Delete ' + id);

    await axios.delete(`http://localhost:7777/api/data/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  // toggle reminder
  const toggleReminder = async (id) => {
    console.log(id);

    const taskToToggle = await fetchTask(id);

    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await axios.put(
      `http://localhost:7777/api/data/tasks/${id}`,
      updatedTask
    );

    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, reminder: res.data.reminder } : task
      )
    );
  };

  return (
    <div className="container md:mx-auto px-4">
      <Header
        showAddTask={showAddTask}
        onAdd={(e) => setShowAddTask(!showAddTask)}
      />
      <div>
        {showAddTask && <AddTask onAdd={addTask} />}
        <div className="p-4 rounded-sm">
          {/* {tasks.length > 0 ? ( */}
          <Tasks
            tasks={tasks}
            onToggle={toggleReminder}
            onDelete={deleteTask}
          />
          {/* ) : (
            <div className="container md:mx-auto px-4">No Tasks To Show</div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default App;
