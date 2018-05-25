import constant from './constant';

export const log = constant((params) => console.log(JSON.stringify(params, 4, null)));

export default log;
