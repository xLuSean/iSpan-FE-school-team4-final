import { useEffect } from 'react';
import useTimeout from './useTimeout';

function useDebounceShinder(doSomething, ms = 500) {
  if (!(doSomething instanceof Function)) throw new Error('not a function');

  useEffect(() => {
    const tid = setTimeout(doSomething, ms);
    return () => clearTimeout(tid);
  }, [doSomething, ms]);
}

//=== HaoHan style <3 <3 <3
function useDebounceHH(doSomething, dep, ms = 500) {
  if (!(doSomething instanceof Function)) throw new Error('not a function');

  useEffect(() => {
    const tid = setTimeout(doSomething, ms);
    return () => clearTimeout(tid);
  }, dep);
}

//=== Kyle style
// FIXME: cant work
function useDebounce(callback, dependencies, delay = 500) {
  if (!(callback instanceof Function)) throw new Error('not a function');
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  // prevent run at first render
  useEffect(clear, []);
}

export { useDebounceShinder, useDebounceHH, useDebounce };
