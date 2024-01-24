export const throttle = function (cb, delay = 100) {
  let shouldWait = false,
    isSomeCallOnQueue = false;

  const timeOutFunc = (...storedArgs) => {
    if (isSomeCallOnQueue) {
      cb(...storedArgs);
      isSomeCallOnQueue = false;
      setTimeout(timeOutFunc, delay);
    } else {
      shouldWait = false;
    }
  };

  return (...args) => {
    if (shouldWait) {
      isSomeCallOnQueue = true;
      return;
    }

    cb(...args);
    shouldWait = true;
    setTimeout(timeOutFunc(...args), delay);
  };
};
