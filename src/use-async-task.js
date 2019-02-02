import {
  useEffect,
  useReducer,
  useRef,
} from 'react';
import shallowequal from 'shallowequal';

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

export const useAsyncTask = (func, inputs) => {
  const forceUpdate = useForceUpdate();
  const task = useRef(null);
  const prevInputs = useRef();
  if (!prevInputs || !shallowequal(prevInputs.current, inputs)) {
    prevInputs.current = inputs;
    task.current = createTask(func, (updatedTask) => {
      if (task.current && task.current.taskId === updatedTask.taskId) {
        task.current = updatedTask;
        forceUpdate();
      }
    });
  }
  useEffect(() => {
    const cleanup = () => {
      task.current = null;
    };
    return cleanup;
  }, []);
  return task.current;
};

export default useAsyncTask;
