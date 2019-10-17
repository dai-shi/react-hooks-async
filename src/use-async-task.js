import {
  useEffect,
  useReducer,
} from 'react';
import { useMemoOne as useMemo } from 'use-memo-one';

let idCount = 0;
const nextId = () => {
  idCount += 1;
  return idCount;
};

const createTask = (func, forceUpdate) => {
  const task = {
    abortController: null,
    start: async (...args) => {
      if (task.id === null) {
        // already cleaned up
        return null;
      }
      task.abort();
      task.abortController = new AbortController();
      const taskId = nextId();
      task.id = taskId;
      task.started = true;
      task.pending = true;
      task.error = null;
      task.result = null;
      forceUpdate();
      let result = null;
      let err = null;
      try {
        result = await func(task.abortController, ...args);
      } catch (e) {
        err = e;
      }
      if (task.id === taskId) {
        task.result = result;
        task.error = err;
        task.started = false;
        task.pending = false;
        forceUpdate();
      }
      if (err) throw err;
      return result;
    },
    abort: () => {
      if (task.abortController) {
        task.abortController.abort();
        task.abortController = null;
      }
    },
    id: 0,
    started: false,
    pending: true,
    error: null,
    result: null,
  };
  return task;
};

export const useAsyncTask = (func) => {
  const [, forceUpdate] = useReducer(c => c + 1, 0);
  const task = useMemo(() => createTask(func, forceUpdate), [func]);
  useEffect(() => {
    const cleanup = () => {
      task.id = null;
      task.abort();
    };
    return cleanup;
  }, [task]);
  return useMemo(() => ({
    start: task.start,
    abort: task.abort,
    started: task.started,
    pending: task.pending,
    error: task.error,
    result: task.result,
  }), [
    task.start,
    task.abort,
    task.started,
    task.pending,
    task.error,
    task.result,
  ]);
};
