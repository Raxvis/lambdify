const match = require('./../src/router/match');

it('match should throw if now known type', () => {
  expect(() => match({}, 'unknown')).toThrow();
});
