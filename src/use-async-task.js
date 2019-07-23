import { useEffect, useLayoutEffect, useReducer } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

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
      return {
        ...state,
        started: true,
        pending: true,
        error: null,
        result: null,
      };
    case 'result':
      return {
        ...state,
        pending: false,
        result: action.result,
      };
    case 'error':
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
  useIsomorphicLayoutEffect(() => {
    let dispatchSafe = action => dispatch(action);
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
      dispatchSafe({ type: 'start' });
      try {
        const result = await func(abortController, ...args);
        dispatchSafe({ type: 'result', result });
      } catch (e) {
        dispatchSafe({ type: 'error', error: e });
      }
    };
    dispatch({ type: 'ready', start, abort });
    const cleanup = () => {
      dispatchSafe = () => null; // avoid to dispatch after stopped
      dispatch({ type: 'init' });
    };
    return cleanup;
  }, [func]);
  return state;
};
