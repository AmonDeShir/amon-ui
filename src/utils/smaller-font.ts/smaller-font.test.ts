import { theme } from '../../themes/theme';
import { smallerFont } from './smaller-font';

describe('smallerFont', () => {
  it(`should return smaller font`, () => {
    expect(smallerFont(theme, 'bigger')).toEqual('big');
  });

  it(`should return the smallest font if the originalFont parameter is equal to the name if the smallest font`, () => {
    expect(smallerFont(theme, 'smaller')).toEqual('smaller');
  });

  it(`should return the 'small' font if the originalFont parameter is not included in the theme.font array`, () => {
    expect(smallerFont(theme, 'fontThatNotExist' as any)).toEqual('small');
  });

  it(`should return the 'small' font if the originalFont parameter is undefined`, () => {
    expect(smallerFont(theme, undefined)).toEqual('small');
  });
});
