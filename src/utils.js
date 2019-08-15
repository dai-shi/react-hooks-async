import { useEffect, useRef } from 'react';

export const useMemoList = (list, compareFn = (a, b) => a === b) => {
  const listRef = useRef(list);
  const listChanged = list.length !== listRef.current.length
    || list.some((arg, index) => !compareFn(arg, listRef.current[index]));
  useEffect(() => {
    if (listChanged) {
      listRef.current = list;
    }
  });
  return listChanged ? list : listRef.current;
};
