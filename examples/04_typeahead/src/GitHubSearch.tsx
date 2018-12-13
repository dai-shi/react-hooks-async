import * as React from 'react';

import {
  useAsyncCombineSeq,
  useAsyncRun,
  useAsyncTaskDelay,
  useAsyncTaskFetch,
} from 'react-hooks-async';

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
  const delayTask = useAsyncTaskDelay(500, [query]);
  const fetchTask = useAsyncTaskFetch<Result>(url);
  const combinedTask = useAsyncCombineSeq(delayTask, fetchTask);
  useAsyncRun(combinedTask);
  if (delayTask.pending) return <div>Waiting...</div>;
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
