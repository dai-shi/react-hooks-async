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

const PagedList: React.FC = () => {
  const [page, setPage] = useState(1);
  const url = `https://reqres.in/api/users?page=${page}&per_page=${limit}&delay=1`;
  const asyncTask = useAsyncTaskFetch<Result>(url);
  useAsyncRun(asyncTask);
  if (asyncTask.aborted) {
    return <div>Aborted!</div>;
  }
  if (asyncTask.error) {
    return <div>Something wrong happened: ${asyncTask.error.message}</div>;
  }
  if (asyncTask.pending) {
    return <div>Loading...</div>;
  }
  const hasMore = (asyncTask.result.page < asyncTask.result.total_pages);
  return (
    <div>
      <ul>
        {asyncTask.result.data.map((item) => (
          <li key={item.id}>{item.first_name} {item.last_name}</li>
        ))}
      </ul>
      <button type="button" onClick={() => setPage(page - 1)} disabled={page <= 1}>
        Previous page
      </button>
      <button type="button" onClick={() => setPage(page + 1)} disabled={!hasMore}>
        Next page
      </button>
    </div>
  );
};

export default PagedList;
