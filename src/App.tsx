import { useContext, useState, SyntheticEvent, useRef } from 'react';
import { FaSpinner } from 'react-icons/fa';

import { TTodoContextType } from './@types/todo';
import { TodoContext } from './context/TodoContext';
import Todo from './components/Todo';
import SearchBar from './components/SearchBar';
import TodoList from './components/TodoList';

const App = () => {
  const { todos, isLoading, error, setError, addTodo } = useContext(
    TodoContext
  ) as TTodoContextType;

  const [title, setTitle] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const titleInputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (event: SyntheticEvent) => {
    setError(null);
    event.preventDefault();

    if (!title.trim().length) {
      setError('Title is required');
      return;
    }

    addTodo(title);
    setTitle('');

    titleInputRef.current?.focus();
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen font-sans bg-teal-500">
      <div
        id="custom-scrollbar"
        className="w-5/6 p-6 m-4 overflow-y-auto bg-white rounded shadow h-5/6"
      >
        <form onSubmit={onSubmitHandler} className="mb-4">
          <h1 className="text-3xl font-bold text-grey-darkest">Todo List</h1>
          <div className="flex mt-4">
            <input
              ref={titleInputRef}
              value={title}
              className="w-full px-3 py-2 mr-4 border border-purple-300 rounded shadow outline-none appearance-none focus:border-purple-500 text-grey-darker"
              placeholder="Add Todo"
              onChange={(e) => setTitle(e.target.value)}
            />
            <button className="p-2 border-2 rounded flex-no-shrink border-sky-500 text-teal hover:text-white hover:bg-sky-500">
              Add
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </form>

        <hr className="w-full my-5 border border-gray-400" />

        {isLoading && (
          <div className="flex flex-row items-center justify-center w-full h-6">
            <FaSpinner className="text-3xl animate-spin" />
          </div>
        )}

        {!isLoading && todos && (
          <TodoList
            todos={todos.filter(({ title }) =>
              title.toLowerCase().includes(searchKeyword.toLowerCase())
            )}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
        )}
      </div>
    </div>
  );
};

export default App;
