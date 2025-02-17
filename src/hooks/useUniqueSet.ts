import { useState, useCallback, useEffect } from 'react';

function useUniqueSet<T>(keyExtractor: (item: T) => string, initialItems: T[] = []) {
  const [items, setItems] = useState<Set<T>>(new Set(initialItems));

  useEffect(() => {
    setItems(() => {
      const newSet = new Set(initialItems);
      return newSet;
    });
  }, [initialItems]);

  const add = useCallback((item: T) => {
    setItems((prev) => {
      const newSet = new Set(prev);
      newSet.add(item);
      return newSet;
    });
  }, []);

  const remove = useCallback(
    (item: T) => {
      setItems((prev) => {
        const newSet = new Set(prev);
        newSet.forEach((existingItem) => {
          if (keyExtractor(existingItem) === keyExtractor(item)) {
            newSet.delete(existingItem);
          }
        });
        return newSet;
      });
    },
    [keyExtractor],
  );

  const removeAll = useCallback(() => {
    setItems((prev) => {
      const newSet = new Set(prev);
      newSet.clear();
      return newSet;
    });
  }, [keyExtractor]);

  const has = useCallback(
    (item: T) => {
      for (const existingItem of items) {
        if (keyExtractor(existingItem) === keyExtractor(item)) {
          return true;
        }
      }
      return false;
    },
    [items, keyExtractor],
  );

  return { items: Array.from(items), has, add, remove, removeAll };
}

export default useUniqueSet;
