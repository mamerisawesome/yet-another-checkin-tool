/**
 * Use `calc(${SizeIncrement} * N)` for consistent sizes and gaps.
 * Or use the function `getSize(param)` where `param` is the righthand modifier for the increment
 */
export const SizeIncrement = '8px';
export const DefaultFontSize = '14px';

export const getSize = (param: string = '') => param ? `calc(${SizeIncrement} ${param})` : SizeIncrement;

export const Colors = {
  primary: '#EF4631',
  navbar: '#FBFDFC',
  danger: '#EF4631',
  success: '#1FC0A7',
  black: '#000000',
  grey1: '#363636',
  grey2: '#757575',
  grey3: '#A0A0A0',
  grey4: '#DBDBDB',
  grey5: '#EAEAEA',
  grey6: '#f5f5f5',
  white: '#FFFFFF',
};

export const BoxShadow = {
  primary: `2px 2px 5px ${Colors.grey5}`,
  card: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px`,
};

export const DefaultMediaBreakpoint = '@media (max-width: 1664px)';
