/* eslint camelcase: off */

import React, { useState } from 'react';

import { useAsyncTaskFetch, useAsyncRun } from 'react-hooks-async';

const limit = 3;

type Result = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }[];
};

const ContinuedList: React.FC = () => {
  const [hasMore, setHasMore] = useState(false);
  const [list, setList] = useState<Result['data']>([]);
  const page = Math.floor(list.length / limit) + 1;
  const url = `https://reqres.in/api/users?page=${page}&per_page=${limit}&delay=1`;
  const asyncTask = useAsyncTaskFetch<Result>(url);
  const isFirstTime = page === 1 && !asyncTask.started;
  useAsyncRun(isFirstTime && asyncTask);
  if (asyncTask.aborted) {
    return <div>Aborted!</div>;
  }
  if (asyncTask.error) {
    return <div>Something wrong happened: ${asyncTask.error.message}</div>;
  }
  if (!asyncTask.pending && asyncTask.result.page === page) {
    setList(prev => [...prev, ...asyncTask.result.data]);
    setHasMore(asyncTask.result.page < asyncTask.result.total_pages);
  }
  return (
    <div>
      <ul>
        {list.map(item => (
          <li key={item.id}>{item.first_name} {item.last_name}</li>
        ))}
      </ul>
      <button type="button" onClick={() => asyncTask.start()} disabled={!hasMore}>
        Load more
      </button>
      {asyncTask.started && <div>Loading...</div>}
    </div>
  );
};

export default ContinuedList;
