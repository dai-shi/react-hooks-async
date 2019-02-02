import { useRef } from 'react';
import shallowequal from 'shallowequal';

import { useAsyncTaskTimeout } from './use-async-task-timeout';

export const useAsyncTaskDelay = (milliSeconds, inputs) => {
  const func = useRef();
  const prevInputs = useRef();
  if (!prevInputs.current || !shallowequal(prevInputs.current, inputs)) {
    prevInputs.current = inputs;
    func.current = () => true;
  }
  return useAsyncTaskTimeout(func.current, milliSeconds);
};

export default useAsyncTaskDelay;
