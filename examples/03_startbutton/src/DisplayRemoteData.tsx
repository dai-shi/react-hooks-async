import React from 'react';

import { useAsyncTaskFetch } from 'react-hooks-async';

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
  if (asyncTask.error) return <Err error={asyncTask.error} />;
  if (asyncTask.started && asyncTask.pending) return <Loading abort={asyncTask.abort} />;
  if (asyncTask.result) return <div>RemoteData: {asyncTask.result.title}</div>;
  return <button type="button" onClick={() => asyncTask.start()}>start</button>;
};

export default DisplayRemoteData;
