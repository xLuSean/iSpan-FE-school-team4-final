import { useCallback, useEffect, useRef } from 'react';

export default function useTimeout(callback, delay = 1000) {
  //=== use useRef to 'rember' the function
  const callbackRef = useRef(callback);
  const timeoutRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // === everytime dalay change will reset the timer
  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  // === if timeoutRef.current exist, clear it
  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    // 設置定時器
    set();
    // 在組件卸載或延遲時間改變時，清除定時器
    return clear;
  }, [delay, set, clear]);

  // 提供重置和清除定時器的函式
  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  // 回傳重置和清除定時器的函式
  return { reset, clear };
}

//================================================================
//=== README =====================================================
//================================================================
//>>>  example
//  [count, setCount] = useState(10)
//  [clear, reset] = useTimeout(()=>setCount(10), 1000)
//
//  <button onClick={()=>setCount(1)}></button>
//  <button onClick={clear}></button>
// <button onClick={reset}></button>
//
//<<< example
