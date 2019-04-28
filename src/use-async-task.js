import { useEffect, useReducer } from 'react';

const initialState = {
  started: false,
  pending: true,
  error: null,
  result: null,
  start: null,
  abort: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return initialState;
    case 'ready':
      return {
        ...state,
        start: action.start,
        abort: action.abort,
      };
    case 'start':
      if (state.started) return state; // to bail out just in case
      return {
        ...state,
        started: true,
      };
    case 'result':
      if (!state.pending) return state; // to bail out just in case
      return {
        ...state,
        pending: false,
        result: action.result,
      };
    case 'error':
      if (!state.pending) return state; // to bail out just in case
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      throw new Error(`unexpected action type: ${action.type}`);
  }
};

export const useAsyncTask = (func, deps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    let dispatchSafe = action => dispatch(action);
    let abortController = null;
    const start = async (...args) => {
      if (abortController) return;
      abortController = new AbortController();
      dispatchSafe({ type: 'start' });
      try {
        const result = await func(abortController, ...args);
        dispatchSafe({ type: 'result', result });
      } catch (e) {
        dispatchSafe({ type: 'error', error: e });
      }
      abortController = null; // allow to run task multile times
    };
    const abort = () => {
      if (abortController) {
        abortController.abort();
      }
    };
    dispatch({ type: 'ready', start, abort });
    const cleanup = () => {
      dispatchSafe = () => null; // avoid to dispatch after stopped
      dispatch({ type: 'init' });
    };
    return cleanup;
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
  return state;
};

export default useAsyncTask;
