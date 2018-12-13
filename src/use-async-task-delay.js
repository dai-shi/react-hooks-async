import { useCallback } from 'react';

import { useAsyncTaskTimeout } from './use-async-task-timeout';

export const useAsyncTaskDelay = (milliSeconds, inputs) => useAsyncTaskTimeout(
  useCallback(() => true, inputs),
  milliSeconds,
);

export default useAsyncTaskDelay;
