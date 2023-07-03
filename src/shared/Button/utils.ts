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
  black: 'bg-black hover:enabled:bg-black-700 disabled:bg-black-700/30',
  orange: 'bg-orange hover:enabled:bg-orange-700 disabled:bg-orange-700/30',
  brown: 'bg-brown hover:enabled:bg-brown-700 disabled:bg-brown-700/30',
  snow: 'text-black! bg-snow hover:enabled:bg-snow-700 disabled:bg-snow-700/30',
};

const borderedByColor: ByColor = {
  black: 'text-black hover:enabled:bg-black-700/10 disabled:text-black/30',
  orange: 'text-orange hover:enabled:bg-orange-700/10 disabled:text-orange/30',
  brown: 'text-brown hover:enabled:bg-brown-700/10 disabled:text-brown/30',
  snow: 'text-snow hover:enabled:bg-snow-700/10 disabled:text-orange/30',
};

const textByColor: ByColor = {
  ...borderedByColor,
};

const ringColorByColor: ByColor = {
  black: 'focus:ring-black-700/30',
  orange: 'focus:ring-orange-700/30',
  brown: 'focus:ring-brown-700/30',
  snow: 'focus:ring-snow-700/30',
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
      appearance = `text-snow disabled:text-snow/70 ${filledByColor[color]}`;
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
  return `cursor-no-drop`;
};
