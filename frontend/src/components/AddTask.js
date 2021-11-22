// Component-Level State

import { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert('Please Add a Task');
      return;
    }

    onAdd({ text, day, reminder });

    setText('');
    setDay('');
    setReminder(false);
  };

  return (
    <form
      className="container mx-auto my-8 max-w-2xl text-lg font-semibold"
      onSubmit={onSubmit}
    >
      <label htmlFor="task">Task</label>
      <input
        className="block px-3 py-2 my-2 rounded w-full"
        type="text"
        id="task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <label htmlFor="date">Day and Time</label>
      <input
        className="block px-3 py-2 my-2 rounded w-full"
        type="text"
        id="date"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      />
      <div className="flex items-center">
        <label htmlFor="reminder">Set Reminder: (remind me or not) </label>
        <input
          className="block p-3 my-2 mx-5 rounded"
          type="checkbox"
          id="reminder"
          checked={reminder}
          onChange={(e) => setReminder(e.target.checked)}
        />
      </div>
      <button className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-400">
        Save Task
      </button>
    </form>
  );
};

export default AddTask;
