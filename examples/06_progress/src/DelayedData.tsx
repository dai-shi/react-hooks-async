import * as React from 'react';

import { useAsyncCombineAll, useAsyncRun, useAsyncTaskTimeout } from 'react-hooks-async';

const { useCallback } = React;

const Progress: React.SFC<{ current: number; max: number }> = ({ current, max }) => (
  <div>
    Loading... (
    {current}
    /
    {max}
    )
  </div>
);

const RemoteData: React.FC = () => {
  const asyncTasks = [
    useAsyncTaskTimeout(useCallback(() => <span>Hello1</span>, []), 1000),
    useAsyncTaskTimeout(useCallback(() => <span>Hello2</span>, []), 2000),
    useAsyncTaskTimeout(useCallback(() => <span>Hello3</span>, []), 3000),
    useAsyncTaskTimeout(useCallback(() => <span>Hello4</span>, []), 4000),
    useAsyncTaskTimeout(useCallback(() => <span>Hello5</span>, []), 5000),
  ];
  const combinedTask = useAsyncCombineAll(...asyncTasks);
  useAsyncRun(combinedTask);
  if (combinedTask.pending) {
    return (
      <Progress
        current={asyncTasks.filter(({ result }) => !!result).length}
        max={asyncTasks.length}
      />
    );
  }
  return (
    <div>
      RemoteData:
      {asyncTasks.map((task, index) => (
        task.result && (
          <div>
            {index}
            :
            {task.result}
          </div>
        )
      ))}
    </div>
  );
};

export default RemoteData;
