import React, { useMemo } from 'react';
import axios from 'axios';

import { useAsyncRun, useAsyncTaskAxios } from 'react-hooks-async';

const Err: React.SFC<{ error: Error }> = ({ error }) => (
  <div>Error: {error.name} {error.message}</div>
);

const Loading: React.SFC<{ abort: () => void }> = ({ abort }) => (
  <div>
    Loading...
    <button type="button" onClick={abort}>Abort</button>
  </div>
);

type Response = {
  data: {
    title: string;
  };
};

const DisplayRemoteData: React.FC<{ id: string }> = ({ id }) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const config = useMemo(() => ({ url }), [url]);
  const asyncTask = useAsyncTaskAxios<Response>(axios, config);
  useAsyncRun(asyncTask);
  if (asyncTask.aborted) return <Err error={new Error('Aborted')} />;
  if (asyncTask.error) return <Err error={asyncTask.error} />;
  if (asyncTask.pending) return <Loading abort={asyncTask.abort} />;
  return <div>RemoteData: {asyncTask.result.data.title}</div>;
};

export default DisplayRemoteData;
