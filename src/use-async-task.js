import {
  useLayoutEffect,
  useReducer,
  useRef,
} from 'react';

import { shallowArrayEqual } from './utils';

const forcedReducer = state => !state;
const useForceUpdate = () => useReducer(forcedReducer, false)[1];

let idCounter = 0;

const createTask = (func, notifyUpdate) => {
  const taskId = Symbol(`async_task_id_${idCounter += 1}`);
  let abortController = null;
  let task = {
    taskId,
    started: false,
    pending: true,
    error: null,
    result: null,
    start: async () => {
      if (task.started) return;
      abortController = new AbortController();
      task = { ...task, started: true };
      notifyUpdate(task);
      try {
        task = {
          ...task,
          pending: false,
          result: await func(abortController),
        };
      } catch (e) {
        task = {
          ...task,
          pending: false,
          error: e,
        };
      }
      notifyUpdate(task);
    },
    abort: () => {
      if (abortController) {
        abortController.abort();
      }
    },
  };
  return task;
};

export const useAsyncTask = (func, deps) => {
  const forceUpdate = useForceUpdate();
  // deps
  const prevDeps = useRef(null);
  useLayoutEffect(() => {
    prevDeps.current = deps;
  });
  // task
  const task = useRef(null);
  let currentTask = task.current;
  useLayoutEffect(() => {
    // We need to set task.current before event hander can be called.
    task.current = currentTask;
    const cleanup = () => {
      task.current = null;
    };
    return cleanup;
  });
  // create task
  if (!currentTask || !shallowArrayEqual(prevDeps.current, deps)) {
    currentTask = createTask(func, (updatedTask) => {
      // Note: task.start() should be called in useEffect or event handler,
      // otherwise the task will be not updated.
      if (task.current && task.current.taskId === updatedTask.taskId) {
        task.current = updatedTask;
        forceUpdate();
      }
    });
  }
  return currentTask;
};

export default useAsyncTask;
