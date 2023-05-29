import { createContext, PropsWithChildren } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { localStorageKeys } from '@/configs/local-storage-keys';

export type ScrollDirectionType = 'horizontal' | 'vertical';
interface ScrollDirectionContextValue {
  scrollDirection: ScrollDirectionType;
  setScrollDirection: (type: ScrollDirectionType) => void;
}

export const ScrollDirectionContext = createContext<ScrollDirectionContextValue>({
  scrollDirection: 'horizontal',
  setScrollDirection: () => {},
});

export const ScrollDirectionContextProvider = (props: PropsWithChildren) => {
  const [scrollDirection, setScrollDirection] = useLocalStorage<ScrollDirectionType>(localStorageKeys.SCROLL_DIRECTION, 'horizontal');

  return (
    <ScrollDirectionContext.Provider value={{ scrollDirection, setScrollDirection }}>{props.children}</ScrollDirectionContext.Provider>
  );
};
