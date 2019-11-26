import {
  useLayoutEffect,
  useReducer,
  useRef,
} from 'react';

const createTask = ({ func, dispatchRef }) => {
  const taskId = Symbol('TASK_ID');
  let abortController = null;
  return {
    func,
    taskId,
    runId: null,
    start: async (...args) => {
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      const runId = Symbol('RUN_ID');
      dispatchRef.current({
        type: 'START',
        taskId,
        runId,
      });
      let result = null;
      let error = null;
      try {
        result = await func(abortController, ...args);
      } catch (e) {
        if (e.name !== 'AbortError') {
          error = e;
        }
      }
      dispatchRef.current({
        type: 'END',
        taskId,
        runId,
        result,
        error,
      });
      if (error) throw error;
      return result;
    },
    abort: () => {
      if (abortController) {
        abortController.abort();
        abortController = null;
      }
    },
    started: false,
    pending: true,
    error: null,
    result: null,
  };
};

const reducer = (task, action) => {
  switch (action.type) {
    case 'INIT':
      return createTask(action);
    case 'START':
      if (task.taskId !== action.taskId) {
        return task; // bail out
      }
      return {
        ...task,
        runId: action.runId,
        started: true,
        pending: true,
        error: null,
        result: null,
      };
    case 'END':
      if (task.taskId !== action.taskId || task.runId !== action.runId) {
        return task; // bail out
      }
      return {
        ...task,
        started: false,
        pending: false,
        error: action.error,
        result: action.result,
      };
    default:
      throw new Error(`unknown action type: ${action.type}`);
  }
};

export const useAsyncTask = (func) => {
  const dispatchRef = useRef(() => { throw new Error('not initialized'); });
  const [task, dispatch] = useReducer(reducer, { func, dispatchRef }, createTask);
  if (task.func !== func) {
    dispatch({ type: 'INIT', func, dispatchRef });
  }
  useLayoutEffect(() => {
    dispatchRef.current = dispatch;
    const cleanup = () => {
      dispatchRef.current = () => {};
    };
    return cleanup;
  }, []);
  return task;
};
