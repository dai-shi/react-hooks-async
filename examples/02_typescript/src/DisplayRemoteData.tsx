import React from 'react';

import { useAsyncRun, useAsyncTaskFetch } from 'react-hooks-async';

const Err: React.SFC<{ error: Error }> = ({ error }) => (
  <div>Error: {error.name} {error.message}</div>
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
  useAsyncRun(asyncTask);
  if (asyncTask.aborted) return <Err error={new Error('Aborted')} />;
  if (asyncTask.error) return <Err error={asyncTask.error} />;
  if (asyncTask.pending) return <Loading abort={asyncTask.abort} />;
  return <div>RemoteData: {asyncTask.result.title}</div>;
};

export default DisplayRemoteData;
