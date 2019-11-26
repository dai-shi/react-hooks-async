import { useRef } from 'react';

export const useMemoList = (list, compareFn = (a, b) => a === b) => {
  const listRef = useRef(list);
  const listChanged = list.length !== listRef.current.length
    || list.some((arg, index) => !compareFn(arg, listRef.current[index]));
  if (listChanged) {
    // we can't do this in effects, which run too late.
    listRef.current = list;
  }
  return listRef.current;
};
