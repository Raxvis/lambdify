const match = require('./../router/match');

it('match should throw if now known type', () => {
	expect(() => match({}, 'unknown')).toThrow();
});
