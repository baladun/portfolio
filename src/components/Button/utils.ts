import { ButtonProps } from './types';

type Type = Required<ButtonProps>['type'];
type Size = Required<ButtonProps>['size'];
type Color = Required<ButtonProps>['color'];

type BySize = { [K in Size]: string };
type ByColor = { [K in Color]: string };

const fontBySize: BySize = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const filledByColor: ByColor = {
  black: 'bg-black hover:enabled:bg-black-700',
  orange: 'bg-orange hover:enabled:bg-orange-700',
  brown: 'bg-brown hover:enabled:bg-brown-700',
};

const borderedByColor: ByColor = {
  black: 'text-black hover:enabled:bg-black-50/70',
  orange: 'text-orange hover:enabled:bg-orange-50/70',
  brown: 'text-brown hover:enabled:bg-brown-50/70',
};

const textByColor: ByColor = {
  ...borderedByColor,
};

const ringColorByColor: ByColor = {
  black: 'focus:ring-black-100',
  orange: 'focus:ring-orange-100',
  brown: 'focus:ring-brown-100',
};

export const getDimensions = (size: Size, type: Type, iconOnly: boolean) => {
  const py = type === 'bordered' ? 'py-[calc(0.5em-1px)]' : 'py-[0.5em]';
  const pxIconOnly = iconOnly ? (type === 'bordered' ? 'px-[calc((1lh+1em)/2-0.5em-1px)]' : 'px-[calc((1lh+1em)/2-0.5em)]') : '';
  const pxDefault = type === 'bordered' ? 'px-[calc(1em-1px)]' : 'px-[1em]';

  return `${fontBySize[size]} ${py} ${pxIconOnly || pxDefault}`;
};

export const getAppearance = (type: Type, color: Color) => {
  let appearance: string;

  switch (type) {
    case 'filled':
      appearance = `text-snow ${filledByColor[color]}`;
      break;
    case 'bordered':
      appearance = `bg-transparent border border-solid ${borderedByColor[color]}`;
      break;
    case 'text':
      appearance = `bg-transparent ${textByColor[color]}`;
      break;
  }

  return `${appearance} transition-colors duration-150`;
};

export const getFocus = (color: Color) => {
  return `focus:outline-none focus:ring ${ringColorByColor[color]}`;
};

export const getDisabled = () => {
  return `disabled:opacity-30 cursor-no-drop`;
};
