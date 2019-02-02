import { useRef } from 'react';
import shallowequal from 'shallowequal';

import { useAsyncTaskTimeout } from './use-async-task-timeout';

const emptyInputs = Symbol('emtpy inputs');

export const useAsyncTaskDelay = (milliSeconds, inputs) => {
  const func = useRef();
  const previousInputs = useRef(emptyInputs);
  if (!shallowequal(inputs, previousInputs.current)) {
    previousInputs.current = inputs;
    func.current = () => true;
  }
  return useAsyncTaskTimeout(func.current, milliSeconds);
};

export default useAsyncTaskDelay;
