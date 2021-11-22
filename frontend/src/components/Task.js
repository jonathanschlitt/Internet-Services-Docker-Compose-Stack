import { FaTimes } from 'react-icons/fa';

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`bg-gray-200 my-2 p-5 rounded-sm drop-shadow-lg border-l-8 border-red-600 ${
        task.reminder ? 'border-opacity-100' : 'border-opacity-0'
      }`}
      onDoubleClick={() => onToggle(task._id)}
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-xl ">{task.text}</p>
        <FaTimes
          onClick={() => onDelete(task._id)}
          className="text-red-600 w-6 h-6 cursor-pointer"
        />
      </div>

      <p>{task.day}</p>
    </div>
  );
};

export default Task;
