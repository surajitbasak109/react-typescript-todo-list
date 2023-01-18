import React from 'react';

import { TodoListProp } from '../@types/todo';
import SearchBar from './SearchBar';
import Todo from './Todo';

const TodoList: React.FC<TodoListProp> = ({
  todos,
  searchKeyword,
  setSearchKeyword,
}) => {
  return (
    <div className="todo-list">
      <SearchBar searchKeyword={searchKeyword} onChange={setSearchKeyword} />
      {!todos.length && <div>There is no todos found</div>}
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default TodoList;
