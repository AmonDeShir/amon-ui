import notNullish from './not-nullish';

describe(`notNullish`, () => {
  it(`should return false if value is null`, () => {
    expect(notNullish(null)).toBe(false);
  });

  it(`should return false if value is undefined`, () => {
    expect(notNullish(undefined)).toBe(false);
  });

  it(`should return true if value is 0`, () => {
    expect(notNullish(0)).toBe(true);
  });

  it(`should return true if value is an empty string`, () => {
    expect(notNullish('')).toBe(true);
  });

  it(`should return true if value is an object`, () => {
    expect(notNullish({})).toBe(true);
  });

  it(`should return true if value is a function`, () => {
    expect(notNullish(() => {})).toBe(true);
  });

  it(`should return true if value is true`, () => {
    expect(notNullish(true)).toBe(true);
  });

  it(`should return true if value is false`, () => {
    expect(notNullish({})).toBe(true);
  });
});
