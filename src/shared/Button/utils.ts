import { ButtonProps } from './types';

type Kind = Required<ButtonProps>['kind'];
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
  snow: 'text-black! bg-snow hover:enabled:bg-snow-700',
};

const borderedByColor: ByColor = {
  black: 'text-black hover:enabled:bg-black-700/10',
  orange: 'text-orange hover:enabled:bg-orange-700/10',
  brown: 'text-brown hover:enabled:bg-brown-700/10',
  snow: 'text-snow hover:enabled:bg-snow-700/10',
};

const textByColor: ByColor = {
  ...borderedByColor,
};

const ringColorByColor: ByColor = {
  black: 'focus:ring-black-100',
  orange: 'focus:ring-orange-100',
  brown: 'focus:ring-brown-100',
  snow: 'focus:ring-snow-100',
};

export const getDimensions = (size: Size, kind: Kind, iconOnly: boolean) => {
  const py = kind === 'bordered' ? 'py-[calc(0.5em-1px)]' : 'py-[0.5em]';
  const pxIconOnly = iconOnly ? (kind === 'bordered' ? 'px-[calc((1lh+1em)/2-0.5em-1px)]' : 'px-[calc((1lh+1em)/2-0.5em)]') : '';
  const pxDefault = kind === 'bordered' ? 'px-[calc(1em-1px)]' : 'px-[1em]';

  return `${fontBySize[size]} ${py} ${pxIconOnly || pxDefault}`;
};

export const getAppearance = (kind: Kind, color: Color) => {
  let appearance: string;

  switch (kind) {
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
