// import { atom } from "nanostores";
import sectionNames from "../sectionNames";

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
    subscribe: function (cb, callCbImmediatelyWithCurrentValue = true) {
      cbArr.push(cb);
      callCbImmediatelyWithCurrentValue && cb(store);
    },
  };
};

const currentHash = window.location.hash;

let pageIndex = 0;
if (currentHash !== "") {
  const sectionsIds = sectionNames.map((i) => i.toLowerCase());
  pageIndex = sectionsIds.indexOf(currentHash.slice(1));
  if (~pageIndex) {
    document.getElementById(sectionsIds[pageIndex]).scrollIntoView();
  } else {
    pageIndex = 0;
  }
}

const isHeroAnimPending = atom(pageIndex === 0),
  currentPageIndex = atom(pageIndex);

export { currentPageIndex, isHeroAnimPending };
