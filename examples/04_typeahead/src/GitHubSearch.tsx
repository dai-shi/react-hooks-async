import * as React from 'react';

import {
  useAsyncCombineSeq,
  useAsyncRun,
  useAsyncTaskFetch,
  useAsyncTaskTimeout,
} from 'react-hooks-async';

const { useCallback } = React;

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
  items: [{
    id: number,
    name: string,
    html_url: string,
  }],
};

const GitHubSearch: React.FC<{ query: string }> = ({ query }) => {
  const url = `https://api.github.com/search/repositories?q=${query}`;
  const timeoutTask = useAsyncTaskTimeout(useCallback(() => true, [query]), 500);
  const fetchTask = useAsyncTaskFetch<Result>(url);
  const combinedTask = useAsyncCombineSeq(timeoutTask, fetchTask);
  useAsyncRun(query && combinedTask);
  if (!query) return null;
  if (timeoutTask.pending) return <div>Waiting...</div>;
  if (fetchTask.error) return <Err error={fetchTask.error} />;
  if (fetchTask.pending) return <Loading abort={fetchTask.abort} />;
  if (!fetchTask.result) return <div>No result</div>;
  return (
    <ul>
      {fetchTask.result.items.map(({ id, name, html_url }) => (
        <li key={id}><a target="_blank" href={html_url}>{name}</a></li>
      ))}
    </ul>
  );
};

export default GitHubSearch;
