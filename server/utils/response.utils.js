'use strict';
const { isPlainObject, isString } = require('lodash');

/**
 * @param rq - request
 * @param rs - response
 * @param ro - nextjs route
 * @param qu - url query param
 */
module.exports.render = function (rq, rs, ro, qu) {
  const p = isPlainObject(rq.params) ? rq.params : {};
  const q = isPlainObject(qu) ? qu : {};
  const qo = { ...p, ...q };
  if (isString(ro) && ro[0] !== '/') ro = '/' + ro;
  return rs.next.render(rq, rs, ro, { ...rq.query, ...qo});
};
