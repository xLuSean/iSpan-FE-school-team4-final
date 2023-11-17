import { useEffect, useRef } from 'react';

export default function useUpdateEffect(callback, dependencies) {
  const firstrenderRef = useRef(true);
  useEffect(() => {
    if (firstrenderRef) {
      firstrenderRef.current = true;
      return;
    }
    return callback();
  }, dependencies);
}
