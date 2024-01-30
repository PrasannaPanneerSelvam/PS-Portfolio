// import { atom } from "nanostores";

const atom = function (initialValue) {
  let store = initialValue;
  const cbArr = [];

  return {
    get: function () {
      return store;
    },
    set: function (val) {
      if (store === val) return;
      store = val;
      cbArr.forEach((i) => i(store));
    },
    subscribe: function (cb) {
      cbArr.push(cb);
    },
  };
};

const isHeroAnimPending = atom(true),
  currentPageIndex = atom(0);

const isInContactPage = atom(false);

const isInContactPageSetter = isInContactPage.set;
currentPageIndex.subscribe(function (idx) {
  isInContactPageSetter(idx === 2);
});

delete isInContactPage["set"];

export { currentPageIndex, isHeroAnimPending, isInContactPage };
