import { useState } from 'react';

export default function useToggle(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value) {
    setValue((prev) => {
      typeof value === 'boolean' ? value : !prev;
    });
  }

  return [value, toggleValue];
}

//================================================================
//=== README =====================================================
//================================================================
//>>>  example
//  [value, toggleValue] = useToggle(false)
//
//  toggleValue                 // will toggle value if not given input
//  toggleValue(true)           // will toggle value to true
//  toggleValue(false)          // will toggle value to false
//<<< example
