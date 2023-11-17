import { useState, useEffect } from 'react';

const useCheckCSS = (styleString, value) => {
  const [isSupport, setIsSupport] = useState(false);

  useEffect(() => {
    setIsSupport(() => {
      if (typeof CSS.supports !== 'function') return false;
      return value === undefined
        ? CSS.supports(styleString)
        : CSS.supports(styleString, value);
    });
  }, []);

  return isSupport;
};

export default useCheckCSS;
