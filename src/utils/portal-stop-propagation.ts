// you can add more event handler if it is necessary
// https://github.com/facebook/react/issues/11387#issuecomment-1548827669

export const portalStopPropagation = {
  onClick: (e: any) => e.stopPropagation(),
};
