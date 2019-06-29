import * as React from 'react';
import axios from 'axios';
import { useMemoOne as useMemo } from 'use-memo-one';

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
  const {
    pending,
    error,
    result,
    abort,
  } = asyncTask;
  if (error) return <Err error={error} />;
  if (pending) return <Loading abort={abort} />;
  if (!result) return <div>No result</div>;
  return <div>RemoteData: {result.data.title}</div>;
};

export default DisplayRemoteData;
