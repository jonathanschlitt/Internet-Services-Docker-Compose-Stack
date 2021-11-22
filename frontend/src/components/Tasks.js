import Task from './Task';

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <div className="max-w-2xl w-full mx-auto">
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default Tasks;
