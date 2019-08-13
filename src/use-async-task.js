import {
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { useMemoOne as useMemo } from 'use-memo-one';

const createTask = (func, forceUpdateRef) => {
  const task = {
    abortController: null,
    start: async (...args) => {
      task.abort();
      task.abortController = new AbortController();
      task.started = true;
      task.pending = true;
      task.error = null;
      task.result = null;
      forceUpdateRef.current(func);
      try {
        task.result = await func(task.abortController, ...args);
      } catch (e) {
        task.error = e;
      }
      task.pending = false;
      forceUpdateRef.current(func);
    },
    abort: () => {
      if (task.abortController) {
        task.abortController.abort();
        task.abortController = null;
      }
    },
    started: false,
    pending: true,
    error: null,
    result: null,
  };
  return task;
};

export const useAsyncTask = (func) => {
  const [, forceUpdate] = useReducer(c => c + 1, 0);
  const forceUpdateRef = useRef(forceUpdate);
  const task = useMemo(() => createTask(func, forceUpdateRef), [func]);
  useEffect(() => {
    forceUpdateRef.current = (f) => {
      if (f === func) {
        forceUpdate();
      }
    };
    const cleanup = () => {
      forceUpdateRef.current = () => null;
    };
    return cleanup;
  }, [func]);
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
