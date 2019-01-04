import * as React from 'react';

import { useAsyncTaskFetch } from 'react-hooks-async';

const Err: React.SFC<{ error: Error }> = ({ error }) => (
  <div>
    Error:
    {error.name}
    {error.message}
  </div>
);

const Loading: React.SFC<{ abort: () => void }> = ({ abort }) => (
  <div>
    Loading...
    <button type="button" onClick={abort}>Abort</button>
  </div>
);

type Result = {
  data: {
    first_name: string;
  };
};

const UserInfo: React.FC<{ id: string }> = ({ id }) => {
  const url = `https://reqres.in/api/users/${id}?delay=1`;
  const asyncTask = useAsyncTaskFetch<Result>(url);
  const {
    started,
    pending,
    error,
    result,
    start,
    abort,
  } = asyncTask;
  if (!started) return <button onClick={start}>start</button>;
  if (error) return <Err error={error} />;
  if (pending) return <Loading abort={abort} />;
  if (!result) return <div>No result</div>;
  return (
    <div>
      First Name:
      {result.data.first_name}
    </div>
  );
};

export default UserInfo;
