function fixResizeAnimations() {
  let resizeTimer;
  window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove('resize-animation-stopper');
    }, 400);
  });
}

const NavigationBar = (function () {
  const slider = document.getElementById('nav-items-holder'),
    hamburgerButton = document.getElementById('ham-burger-button'),
    secondContainer = document.getElementById('second-container');

  function toggleSideBar() {
    slider.classList.toggle('active');
    hamburgerButton.classList.toggle('active');
    secondContainer.classList.toggle('active');
  }

  slider.addEventListener('click', e => {
    e.stopPropagation();
  });

  hamburgerButton.addEventListener('click', toggleSideBar);
  secondContainer.addEventListener('click', toggleSideBar);

  return { toggleSideBar };
})();

fixResizeAnimations();
