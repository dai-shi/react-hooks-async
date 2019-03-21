import * as React from 'react';

import { useAsyncTaskFetch } from 'react-hooks-async/src/use-async-task-fetch';

const Err: React.SFC<{ error: Error }> = ({ error }) => (
  <div>Error:{error.name}{' '}{error.message}</div>
);

const Loading: React.SFC<{ abort: () => void }> = ({ abort }) => (
  <div>
    Loading...
    <button type="button" onClick={abort}>Abort</button>
  </div>
);

const DisplayRemoteData: React.FC<{ id: string }> = ({ id }) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const asyncTask = useAsyncTaskFetch<{ title: string }>(url);
  const {
    started,
    pending,
    error,
    result,
    start,
    abort,
  } = asyncTask;
  if (!started) return (start && <button type="button" onClick={start}>start</button>);
  if (error) return <Err error={error} />;
  if (pending) return <Loading abort={abort} />;
  if (!result) return <div>No result</div>;
  return <div>RemoteData:{result.title}</div>;
};

export default DisplayRemoteData;
