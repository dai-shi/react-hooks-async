# react-hooks-async

[![Build Status](https://travis-ci.com/dai-shi/react-hooks-async.svg?branch=master)](https://travis-ci.com/dai-shi/react-hooks-async)
[![npm version](https://badge.fury.io/js/react-hooks-async.svg)](https://badge.fury.io/js/react-hooks-async)
[![bundle size](https://badgen.net/bundlephobia/minzip/react-hooks-async)](https://bundlephobia.com/result?p=react-hooks-async)

An abortable async function library with React Hooks

## Introduction

JavaScript promises are not abortable/cancelable.
However, DOM provides AbortController which can be
used for aborting promises in general.

This is a library to provide an easy way to handle
abortable async functions with React Hooks API.

It comes with a collection of custom hooks that can be used as is.
More custom hooks can be developed based on core hooks.

## Install

```bash
npm install react-hooks-async
```

## Usage

A typeahead search example:

<img src="./examples/04_typeahead/screencast.gif" alt="Preview" width="350" />

```javascript
import React, { useState, useCallback } from 'react';

import {
  useAsyncCombineSeq,
  useAsyncRun,
  useAsyncTaskDelay,
  useAsyncTaskFetch,
} from 'react-hooks-async';

const Err = ({ error }) => <div>Error: {error.name} {error.message}</div>;

const Loading = ({ abort }) => <div>Loading...<button onClick={abort}>Abort</button></div>;

const GitHubSearch = ({ query }) => {
  const url = `https://api.github.com/search/repositories?q=${query}`;
  const delayTask = useAsyncTaskDelay(useCallback(() => 500, [query]));
  const fetchTask = useAsyncTaskFetch(url);
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

const App = () => {
  const [query, setQuery] = useState('');
  return (
    <div>
      Query:
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {query && <GitHubSearch query={query} />}
    </div>
  );
};
```

A simple fetch example:

```javascript
import React from 'react';

import { useFetch } from 'react-hooks-async';

const UserInfo = ({ id }) => {
  const url = `https://reqres.in/api/users/${id}?delay=1`;
  const { pending, error, result, abort } = useFetch(url);
  if (pending) return <div>Loading...<button onClick={abort}>Abort</button></div>;
  if (error) return <div>Error: {error.name} {error.message}</div>;
  if (!result) return <div>No result</div>;
  return <div>First Name: {result.data.first_name}</div>;
};

const App = () => (
  <div>
    <UserInfo id={'1'} />
    <UserInfo id={'2'} />
  </div>
);
```

## Examples

The [examples](examples) folder contains working examples.
You can run one of them with

```bash
PORT=8080 npm run examples:minimal
```

and open <http://localhost:8080> in your web browser.

You can also try them in codesandbox.io:
[01](https://codesandbox.io/s/github/dai-shi/react-hooks-async/tree/master/examples/01_minimal)
[02](https://codesandbox.io/s/github/dai-shi/react-hooks-async/tree/master/examples/02_typescript)
[03](https://codesandbox.io/s/github/dai-shi/react-hooks-async/tree/master/examples/03_startbutton)
[04](https://codesandbox.io/s/github/dai-shi/react-hooks-async/tree/master/examples/04_typeahead)
[05](https://codesandbox.io/s/github/dai-shi/react-hooks-async/tree/master/examples/05_axios)
[06](https://codesandbox.io/s/github/dai-shi/react-hooks-async/tree/master/examples/06_progress)
[07](https://codesandbox.io/s/github/dai-shi/react-hooks-async/tree/master/examples/07_race)
[08](https://codesandbox.io/s/github/dai-shi/react-hooks-async/tree/master/examples/08_wasm)

## Reference

Note: Almost all hooks check referential equality of arguments.
Arguments must be memoized if they would change in re-renders.
Consider defining them outside of render,
or useMemo/useMemoOne/useCallback/useCallbackOne.

### Core hooks

#### useAsyncTask

```javascript
const task = useAsyncTask(func);
```

This function is to create a new async task.

The first argument `func` is a function with an argument
which is AbortController. This function returns a promise,
but the function is responsible to cancel the promise by AbortController.

When `func` is referentially changed, a new async task will be created.

The return value `task` is an object that contains information about
the state of the task and some internal information.
The state of the task can be destructured like the following:

```javascript
const { pending, error, result } = task;
```

#### useAsyncRun

```javascript
useAsyncRun(task);
```

This function is to run an async task.
When the task is updated, this function aborts the previous running task
and start the new one.

The first argument `task` is an object returned by `useAsyncTask`
and its variants. This can be a falsy value and in that case
it won't run any tasks. Hence, it's possible to control the timing by:

```javascript
useAsyncRun(ready && task);
```

The return value of this function is `void`.
You need to keep using `task` to get the state of the task.

### Combining hooks

#### useAsyncCombineSeq

```javascript
const combinedTask = useAsyncCombineSeq(task1, task2, ...);
```

This function combines multiple tasks in a sequential manner.

The arguments `task1`, `task2`, ... are tasks created by `useAsyncTask`.
They shouldn't be started running.

The return value `combinedTask` is a newly created combined task which
holds an array of each task results in the result property.

#### useAsyncCombineAll

```javascript
const combinedTask = useAsyncCombineAll(task1, task2, ...);
```

This function combines multiple tasks in a parallel manner.

The arguments and return value are the same as `useAsyncCombineSeq`.

#### useAsyncCombineRace

```javascript
const combinedTask = useAsyncCombineRace(task1, task2, ...);
```

This function combines multiple tasks in a "race" manner.

The arguments and return value are the same as `useAsyncCombineSeq`.

### Helper hooks

These hooks are just wrappers of `useAsyncTask`.

#### useAsyncTaskTimeout

```javascript
const task = useAsyncTaskTimeout(func, delay);
```

This function returns an async task that runs `func` after `delay` ms.

When `func` is referentially changed, a new async task will be created.

#### useAsyncTaskDelay

```javascript
const task = useAsyncTaskDelay(delay);
```

This function returns an async task that finishes after `delay`.
This is a simpler variant of `useAsyncTaskTimeout`.
`delay` is either a number or a function that returns a number.

When `delay` is referentially changed, a new async task will be created.

#### useAsyncTaskFetch

```javascript
const task = useAsyncTaskFetch(input, init, bodyReader);
```

This function returns an async task that runs
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).
The first argument `input` and the second argument `init`
are simply fed into `fetch`. The third argument `bodyReader`
is to read the response body, which defaults to JSON parser.

When `input` or other arguments is referentially changed, a new async task will be created.

The hook `useFetch` has the same signature and runs the async task immediately.

#### useAsyncTaskAxios

```javascript
const task = useAsyncTaskAxios(axios, config);
```

This is similar to `useAsyncTaskFetch` but using
[axios](https://github.com/axios/axios).

When `config` or other arguments is referentially changed, a new async task will be created.

The hook `useAxios` has the same signature and runs the async task immediately.

#### useAsyncTaskWasm

```javascript
const task = useAsyncTaskWasm(input, importObject);
```

This function returns an async task that fetches wasm
and creates a WebAssembly instance.
The first argument `input` is simply fed into `fetch`.
The second argument `importObject` is passed at instantiating WebAssembly.

When `input` or other arguments is referentially changed, a new async task will be created.

The hook `useWasm` has the same signature and runs the async task immediately.

## Limitations

- Due to the nature of React Hooks API, creating async tasks dynamically
  is not possible. For example, we cannot create arbitrary numbers of
  async tasks at runtime.
  For such a complex use case, we would use other solutions including
  upcoming react-cache and Suspense.

## Blogs

- [Introduction to abortable async functions for React with hooks](https://blog.axlight.com/posts/introduction-to-abortable-async-functions-for-react-with-hooks/)
- [Developing React custom hooks for abortable async functions with AbortController](https://blog.axlight.com/posts/developing-react-custom-hooks-for-abortable-async-functions-with-abortcontroller/)
- [How to create React custom hooks for data fetching with useEffect](https://blog.axlight.com/posts/how-to-create-react-custom-hooks-for-data-fetching-with-useeffect/)
