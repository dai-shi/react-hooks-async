import { useEffect, useReducer, useRef } from 'react';
import { useMemoOne as useMemo } from 'use-memo-one';

const createTask = (func, dispatchRef) => {
  let abortController = null;
  const abort = () => {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
  };
  const start = async (...args) => {
    abort();
    abortController = new AbortController();
    dispatchRef.current({ type: 'start', func });
    try {
      const result = await func(abortController, ...args);
      dispatchRef.current({ type: 'result', func, result });
    } catch (e) {
      dispatchRef.current({ type: 'error', func, error: e });
    }
  };
  return {
    start,
    abort,
  };
};

const initialState = {
  func: null,
  started: false,
  pending: true,
  error: null,
  result: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return {
        ...initialState,
        func: action.func,
      };
    case 'start':
      if (state.func !== action.func) return state; // bail out
      return {
        ...state,
        started: true,
        pending: true,
        error: null,
        result: null,
      };
    case 'result':
      if (state.func !== action.func) return state; // bail out
      return {
        ...state,
        pending: false,
        result: action.result,
      };
    case 'error':
      if (state.func !== action.func) return state; // bail out
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      throw new Error(`unexpected action type: ${action.type}`);
  }
};

export const useAsyncTask = (func) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchRef = useRef(dispatch);
  const task = useMemo(() => createTask(func, dispatchRef), [func]);
  if (func !== state.func) {
    dispatch({ type: 'init', func });
  }
  useEffect(() => {
    const cleanup = () => {
      dispatchRef.current = () => null;
    };
    return cleanup;
  }, []);
  return useMemo(() => ({
    started: state.started,
    pending: state.pending,
    error: state.error,
    result: state.result,
    start: task.start,
    abort: task.abort,
  }), [
    state.started,
    state.pending,
    state.error,
    state.result,
    task.start,
    task.abort,
  ]);
};
