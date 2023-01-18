import React, { useContext } from 'react';
import { ITodo, TTodoContextType } from '../@types/todo';
import { MdDone, MdUndo, MdDelete } from 'react-icons/md';
import { TodoContext } from '../context/TodoContext';

const Todo: React.FC<ITodo> = ({ id, title, completed, userId }) => {
  const { removeTodo, markCompleted } = useContext(
    TodoContext
  ) as TTodoContextType;
  return (
    <>
      <div className="flex mb-4 items-center">
        <p
          className={`w-full ${completed ? 'line-through text-green-500' : 'text-gray-800'
            }`}
        >
          {title}
        </p>
        <button
          onClick={() => markCompleted(id)}
          className={`flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white ${completed
              ? 'text-gray-600 border-gray-600 hover:bg-gray-600'
              : 'text-green-500 border-green-500 hover:bg-green-500'
            }`}
        >
          {completed ? <MdUndo /> : <MdDone />}
        </button>
        <button
          onClick={() => removeTodo(id)}
          className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500"
        >
          <MdDelete />
        </button>
      </div>
    </>
  );
};

export default Todo;
