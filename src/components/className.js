// Added only for space constraint
export const addClassName = function (elem, className) {
  toggleClassName(elem, className, true);
};

export const removeClassName = function (elem, className) {
  toggleClassName(elem, className, false);
};

export const toggleClassName = function (elem, className, bool) {
  elem.classList.toggle(className, bool);
};
