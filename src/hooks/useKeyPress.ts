import { useEffect } from 'react';

type Type = 'keydown' | 'keyup' | 'keypress';

export function useKeyPress(key: string, cb: (event: KeyboardEvent) => void, type: Type = 'keydown') {
  const onEvent = (event: KeyboardEvent) => {
    if (event.key === key) {
      cb(event);
    }
  };

  useEffect(() => {
    window.addEventListener(type, onEvent);

    return () => {
      window.removeEventListener(type, onEvent);
    };
  }, []);
}
