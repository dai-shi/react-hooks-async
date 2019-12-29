import { useEffect, useReducer, useRef } from 'react';

export const SYMBOL_ABORTED = Symbol('ABORTED');

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
      dispatchRef.current({ type: 'START', taskId, runId });
      try {
        const result = await func(abortController, ...args);
        dispatchRef.current({ type: 'RESULT', taskId, runId, result });
        return result;
      } catch (error) {
        if (error.name === 'AbortError') {
          dispatchRef.current({ type: 'ABORT', taskId, runId });
          return SYMBOL_ABORTED;
        }
        dispatchRef.current({ type: 'ERROR', taskId, runId, error });
        throw error;
      }
    },
    abort: () => {
      if (abortController) {
        abortController.abort();
        abortController = null;
      }
    },
    started: false,
    pending: true,
    aborted: false,
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
        aborted: false,
        error: null,
        result: null,
      };
    case 'RESULT':
      if (task.taskId !== action.taskId || task.runId !== action.runId) {
        return task; // bail out
      }
      return {
        ...task,
        started: false,
        pending: false,
        result: action.result,
      };
    case 'ABORT':
      if (task.taskId !== action.taskId || task.runId !== action.runId) {
        return task; // bail out
      }
      return {
        ...task,
        started: false,
        aborted: true,
      };
    case 'ERROR':
      if (task.taskId !== action.taskId || task.runId !== action.runId) {
        return task; // bail out
      }
      return {
        ...task,
        started: false,
        pending: false,
        error: action.error,
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
  dispatchRef.current = dispatch;
  useEffect(() => {
    const cleanup = () => {
      dispatchRef.current = () => null;
    };
    return cleanup;
  }, []);
  return task;
};
