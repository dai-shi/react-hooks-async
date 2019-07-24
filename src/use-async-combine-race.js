import { useEffect } from 'react';

import { useAsyncCombineAll } from './use-async-combine-all';

export const useAsyncCombineRace = (...asyncTasks) => {
  const task = useAsyncCombineAll(...asyncTasks);
  const finishedIndex = asyncTasks.findIndex(({ pending }) => !pending);
  useEffect(() => {
    // if there's one task finished, abort all the others
    if (finishedIndex >= 0) {
      asyncTasks.forEach((asyncTask, i) => {
        if (i !== finishedIndex) {
          asyncTask.abort();
        }
      });
    }
  });
  return task;
};
