var add = (a, b, c, d) => a + b + c + d;

var partial = (fn, ...args) => {
  return (...newArgs) => {
    return fn(...[...args, ...newArgs]);
  };
};

var curry = (fn) => {
  newFn = (...args) => {
    if (args.length < fn.length) {
      return partial(newFn, ...args);
    }
    else {
      return fn(...args);
    }
  };

  return newFn;
};

var curried = curry(add);
curried(1)(2)(3)(4);