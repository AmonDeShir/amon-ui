import { useEffect, useState } from 'react';

/** React memo that remembers the last factory result */
export const useMemorableMemo = <T>(
  factory: () => T,
  deps?: React.DependencyList,
) => {
  const [value, setValue] = useState<T>();
  const [lastValue, setLastValue] = useState<T>();

  useEffect(() => {
    setLastValue(value);
    setValue(factory());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [value, lastValue] as [T, T | undefined];
};
