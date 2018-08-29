export const pipe = (...funcs) => async (param) =>
	funcs.length === 0 ? param : pipe(...funcs.slice(1))(await funcs[0](param));

export default pipe;
