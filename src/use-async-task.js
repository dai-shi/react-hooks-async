import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

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
  const task = useRef(null);
  task.current = useMemo(() => createTask(func, (t) => {
    if (task.current && task.current.taskId === t.taskId) {
      // eslint-disable-next-line no-use-before-define
      setState(t);
    }
  }), inputs);
  const [state, setState] = useState(task.current);
  if (state.taskId !== task.current.taskId) {
    setState(task.current);
  }
  useEffect(() => {
    const cleanup = () => {
      task.current = null;
    };
    return cleanup;
  }, []);
  return state;
};

export default useAsyncTask;
