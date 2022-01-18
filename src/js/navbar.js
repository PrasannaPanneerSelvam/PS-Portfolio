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

  let isOpened = false;

  function toggleSideBar() {
    slider.classList.toggle('active');
    hamburgerButton.classList.toggle('active');
    secondContainer.classList.toggle('active');
    isOpened = !isOpened;
  }

  slider.addEventListener('click', e => {
    e.stopPropagation();
  });

  hamburgerButton.addEventListener('click', toggleSideBar);
  secondContainer.addEventListener('click', () => {
    if (isOpened) toggleSideBar();
  });

  return { toggleSideBar };
})();

function scrollNavbarCallback() {
  const navbar = document.getElementById('navigation-bar');

  let lastScrollPosition = window.pageYOffset,
    active = true;

  return () => {
    const currentScroll = window.pageYOffset,
      scrollingUpwards = lastScrollPosition > currentScroll;

    lastScrollPosition = currentScroll;

    if (!active && scrollingUpwards) {
      active = true;
      navbar.classList.remove('hide-nav');
      navbar.classList.add('show-nav');
    } else if (active && !scrollingUpwards) {
      active = false;
      navbar.classList.remove('show-nav');
      navbar.classList.add('hide-nav');
    }
  };
}

fixResizeAnimations();

export default scrollNavbarCallback;
