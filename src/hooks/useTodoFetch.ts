import axios from 'axios';
import { useEffect, useState } from 'react';
import { ITodo } from '../@types/todo';

const useTodoFetch = (url: string) => {
  const [data, setData] = useState<null | ITodo[]>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTodo = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(url);
      setData(data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response?.data);
      } else {
        setError(String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [url]);

  return { data, error, loading };
};

export default useTodoFetch;
