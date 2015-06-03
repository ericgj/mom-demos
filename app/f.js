'use strict';  // es5

/* stolen from ramda */

var __ = {ramda: 'placeholder'}; 

var compose = _createComposer( _compose );

var arity = _curry2(function(n, fn) {
  switch (n) {
    case 0: return function() {return fn.apply(this, arguments);};
    case 1: return function(a0) {void a0; return fn.apply(this, arguments);};
    case 2: return function(a0, a1) {void a1; return fn.apply(this, arguments);};
    case 3: return function(a0, a1, a2) {void a2; return fn.apply(this, arguments);};
    case 4: return function(a0, a1, a2, a3) {void a3; return fn.apply(this, arguments);};
    case 5: return function(a0, a1, a2, a3, a4) {void a4; return fn.apply(this, arguments);};
    case 6: return function(a0, a1, a2, a3, a4, a5) {void a5; return fn.apply(this, arguments);};
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) {void a6; return fn.apply(this, arguments);};
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) {void a7; return fn.apply(this, arguments);};
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {void a8; return fn.apply(this, arguments);};
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {void a9; return fn.apply(this, arguments);};
    default: throw new Error('First argument to arity must be a non-negative integer no greater than ten');
  }
});


module.exports = {
  compose: compose,
  arity: arity
}



// internal

function _compose(f, g) {
  return function() {
    return f.call(this, g.apply(this, arguments));
  };
};

function _createComposer(composeFunction) {
  return function() {
    var idx = arguments.length - 1;
    var fn = arguments[idx];
    var length = fn.length;
    while (--idx >= 0) {
      fn = composeFunction(arguments[idx], fn);
    }
    return arity(length, fn);
  };
};

function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0) {
      return f1;
    } else if (a === __) {
      return f1;
    } else {
      return fn(a);
    }
  };
};

function _curry2(fn) {
  return function f2(a, b) {
    var n = arguments.length;
    if (n === 0) {
      return f2;
    } else if (n === 1 && a === __) {
      return f2;
    } else if (n === 1) {
      return _curry1(function(b) { return fn(a, b); });
    } else if (n === 2 && a === __ && b === __) {
      return f2;
    } else if (n === 2 && a === __) {
      return _curry1(function(a) { return fn(a, b); });
    } else if (n === 2 && b === __) {
      return _curry1(function(b) { return fn(a, b); });
    } else {
      return fn(a, b);
    }
  };
};
