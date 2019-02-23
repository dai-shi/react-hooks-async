import * as React from 'react';

import { useAsyncRun } from 'react-hooks-async';
import { useAsyncTaskAxios, useMemoPrev } from 'react-hooks-async/src/use-async-task-axios';

const Err: React.SFC<{ error: Error }> = ({ error }) => (
  <div>Error:{error.name}{' '}{error.message}</div>
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
  const config = useMemoPrev(() => ({ url }), [url]);
  const asyncTask = useAsyncTaskAxios<Response>(config);
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
  return <div>RemoteData:{result.data.title}</div>;
};

export default DisplayRemoteData;
