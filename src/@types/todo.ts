import React, { SyntheticEvent } from 'react';

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type TTodoContextType = {
  isLoading: boolean;
  error: null | string;
  todos: ITodo[];
  addTodo: (title: string) => void;
  updateTitle: (id: number, title: string) => void;
  markCompleted: (id: number) => void;
  removeTodo: (id: number) => void;
  setError: (message: string | null) => void;
};

export type TProps = {
  children: React.ReactNode;
};

export interface SearchBarProp {
  searchKeyword: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}
