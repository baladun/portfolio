import { Frame } from '@/components/Frame';
import { PlaceholderProps } from './types';

export function Placeholder({ children, ...rest }: PlaceholderProps) {
  return (
    <Frame
      {...rest}
      as="button"
      className="flex cursor-pointer flex-col items-center justify-center border-2 border-orange text-orange focus:outline-none focus:ring focus:ring-orange-700/30"
    >
      {children}
    </Frame>
  );
}
