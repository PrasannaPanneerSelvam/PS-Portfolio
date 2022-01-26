function ResizeAnimationsHandler(resizeFunctions) {
  let resizeTimer;
  window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');

    for (let idx = 0; idx < resizeFunctions.length; idx++) {
      resizeFunctions[idx]();
    }

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove('resize-animation-stopper');
    }, 400);
  });
}

export default ResizeAnimationsHandler;
