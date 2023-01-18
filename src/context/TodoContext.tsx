import React, { createContext, useEffect, useState } from 'react';
import { TTodoContextType, TProps, ITodo } from '../@types/todo';
import axios from 'axios';
import { wait } from '../utils/request';

export const TodoContext = createContext<TTodoContextType | null>(null);

TodoContext.displayName = 'TodoContext';

const WAITING_TIME = 100;

export const TodoProvider: React.FC<TProps> = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addTodo = async (title: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        'https://jsonplaceholder.typicode.com/todos',
        {
          title,
          completed: false,
        }
      );
      setTodos([...todos, { ...data, id: new Date().getTime() }]);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response?.data);
      } else {
        setError(String(error));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateTitle = (id: number, title: string) => {
    setIsLoading(true);
    wait(WAITING_TIME)
      .then(() => {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === id) {
            todo.title = title;
          }

          return todo;
        });

        setTodos(updatedTodos);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const markCompleted = (id: number) => {
    setIsLoading(true);
    wait(WAITING_TIME)
      .then(() => {
        setTodos(
          todos.map((todo) => {
            if (todo.id === id) {
              todo.completed = !todo.completed;
            }

            return todo;
          })
        );
      })
      .finally(() => setIsLoading(false));
  };

  const removeTodo = (id: number) => {
    setIsLoading(true);
    wait(WAITING_TIME)
      .then(() => {
        setTodos([...todos.filter((todo) => todo.id !== id)]);
      })
      .finally(() => setIsLoading(false));
  };

  const value = {
    isLoading,
    error,
    todos,
    setError,
    addTodo,
    updateTitle,
    markCompleted,
    removeTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
