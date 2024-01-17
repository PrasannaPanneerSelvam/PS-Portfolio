export const throttle = function (cb, delay = 300) {
    let shouldWait = false,
        isSomeCallOnQueue = false;

    const timeOutFunc = () => {
        if (isSomeCallOnQueue) {
            cb();
            isSomeCallOnQueue = false;
            setTimeout(timeOutFunc, delay);
        } else {
            shouldWait = false;
        }
    };

    return () => {
        if (shouldWait) {
            isSomeCallOnQueue = true;
            return;
        }

        cb();
        shouldWait = true;
        setTimeout(timeOutFunc, delay);
    };
}