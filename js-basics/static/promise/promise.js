import {getThen, doResolve} from './helper';

const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

class P {
  state = PENDING;
  value = null;
  handlers = [];

  constructor(fn) {
    if (typeof this !== 'object') {
      throw new TypeError('Promises must be constructed via new');
    }

    if (typeof fn !== 'function') {
      throw new TypeError('fn must be a function');
    }

    const resolve = (result) => {
      try {
        var then = getThen(result);

        if (then) {
          doResolve(then.bind(result), resolve, reject);
          return
        }

        this.state = FULFILLED;
        this.value = result;
        this.handlers.forEach(handle);
        this.handlers = null;
      } catch (e) {
        reject(e);
      }
    };

    const reject = (error) => {
      this.state = REJECTED;
      this.value = error;
      this.handlers.forEach(handle);
      this.handlers = null;
    };

    const handle = (handler) => {
      if (this.state === PENDING) {
        this.handlers.push(handler);
      } else {
        if (this.state === FULFILLED && typeof handler.onFulfilled === 'function') {
          handler.onFulfilled(this.value);
        }

        if (this.state === REJECTED && typeof handler.onRejected === 'function') {
          handler.onRejected(this.value);
        }
      }
    };

    const done = (onFulfilled, onRejected) => {
      setTimeout(function () {
        handle({
          onFulfilled,
          onRejected
        });
      }, 0);
    };

    this.then = (onFulfilled, onRejected) => {
      return new P(function (resolve, reject) {
        return done(function (result) {
          if (typeof onFulfilled === 'function') {
            try {
              return resolve(onFulfilled(result));
            } catch (ex) {
              return reject(ex);
            }
          } else {
            return resolve(result);
          }
        }, function (error) {
          if (typeof onRejected === 'function') {
            try {
              return resolve(onRejected(error));
            } catch (ex) {
              return reject(ex);
            }
          } else {
            return reject(error);
          }
        });
      });
    };

    doResolve(fn, resolve, reject);
  }
}

export default P;
