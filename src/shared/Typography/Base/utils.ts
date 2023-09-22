import { TypographyProps } from '../types';

const fontFamilyByKind: { [K in Required<TypographyProps>['kind']]: string } = {
  primary: 'font-montserrat',
  secondary: 'font-madreRose',
};

const fontWeightByWeight: { [K in Required<TypographyProps>['weight']]: string } = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
};

const textColorByColor: { [K in Required<TypographyProps>['color']]: string } = {
  black: 'text-black',
  snow: 'text-snow',
  brown: 'text-brown',
  orange: 'text-orange',
  inherit: 'text-inherit',
  current: 'text-current',
};

const textAlignByAlign: { [K in Required<TypographyProps>['align']]: string } = {
  start: 'text-start',
  center: 'text-center',
  end: 'text-end',
};

export const getWeightCssClass = (weight: TypographyProps['weight']): string => {
  return weight ? fontWeightByWeight[weight] : fontWeightByWeight.normal;
};

export const getFamilyCssClass = (kind: TypographyProps['kind']): string => {
  return kind ? fontFamilyByKind[kind] : fontFamilyByKind.primary;
};

export const getColorCssClass = (color: TypographyProps['color']): string => {
  return color ? textColorByColor[color] : textColorByColor.black;
};

export const getAlignCssClass = (align: TypographyProps['align']): string => {
  return align ? textAlignByAlign[align] : '';
};
