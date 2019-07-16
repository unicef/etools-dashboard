import R from 'ramda/index';
/* eslint-disable no-unused-vars, no-console, no-undef */
export const {
    equals,
    propOr,
    pick,
    map,
    compose,
    range,
    keys,
    contains,
    applySpec,
    merge,
    concat,
    prop,
    propEq,
    identity,
    join,
    clone,
    toPairs,
    filter,
    head,
    tail,
    find,
    eqProps,
    values,
    reduce,
    flatten,
    intersection,
    union,
    mergeAll,
    assoc,
    uniq,
    uniqBy,
    sort,
    without,
    last,
    isEmpty,
    reject,
    over,
    view,
    lensIndex,
    lensProp,
    lensPath,
    sum,
    sortBy,
    sortWith,
    ascend,
    descend,
    path,
    any,
    trim,
    toUpper } = R;

export function log(...args) {
  console.log(...args);
  return args[0];
}

export const capitalize = compose(
    join(''),
    over(lensIndex(0), toUpper)
  );
