import * as React from 'react';

import { useAsyncCombineAll, useAsyncRun } from 'react-hooks-async';
import { useAsyncTaskTimeout } from 'react-hooks-async/src/use-async-task-timeout';

const Progress: React.SFC<{ current: number; max: number }> = ({ current, max }) => (
  <div>Loading...({current}/{max})</div>
);

const renderHello1 = () => <span>Hello1</span>;
const renderHello2 = () => <span>Hello2</span>;
const renderHello3 = () => <span>Hello3</span>;
const renderHello4 = () => <span>Hello4</span>;
const renderHello5 = () => <span>Hello5</span>;

const RemoteData: React.FC = () => {
  const asyncTasks = [
    useAsyncTaskTimeout(renderHello1, 1000, [renderHello1]),
    useAsyncTaskTimeout(renderHello2, 2000, [renderHello2]),
    useAsyncTaskTimeout(renderHello3, 3000, [renderHello3]),
    useAsyncTaskTimeout(renderHello4, 4000, [renderHello4]),
    useAsyncTaskTimeout(renderHello5, 5000, [renderHello5]),
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
