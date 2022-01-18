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
    hamburgerButtonContainer = document.getElementById(
      'ham-burger-button-container'
    ),
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

  hamburgerButtonContainer.addEventListener('click', toggleSideBar);
  secondContainer.addEventListener('click', () => {
    if (isOpened) toggleSideBar();
  });

  return { toggleSideBar };
})();

let doNothingOnScrollBar = false;

function scrollNavbarCallback() {
  const navbar = document.getElementById('navigation-bar');

  let lastScrollPosition = window.pageYOffset,
    active = true;

  return () => {
    const currentScroll = window.pageYOffset,
      scrollingUpwards = lastScrollPosition > currentScroll;

    lastScrollPosition = currentScroll;

    if (doNothingOnScrollBar) {
      doNothingOnScrollBar = false;
      return;
    }

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

// Setting navigation tour for nav list items

// TODO :: Fetch from data atrribute
const classNames = ['home', 'about-me', 'projects', 'contact'],
  navBarListItems = document.getElementsByClassName('nav-item-list-item');

const navbarComputedStyleObject = getComputedStyle(
  document.getElementsByClassName('first-container')[0]
);

for (let idx = 0; idx < navBarListItems.length; idx++) {
  const targetElement = document.getElementsByClassName(classNames[idx])[0];
  navBarListItems[idx].addEventListener('click', () => {
    NavigationBar.toggleSideBar();

    // TODO :: Cache the offset value if needed
    const navbarHeight =
        parseInt(navbarComputedStyleObject.height.split('px')[0]) + 10,
      targetOffset = targetElement.offsetTop;

    doNothingOnScrollBar = true;
    window.scrollTo({
      top: targetOffset - (targetOffset === 0 ? 0 : navbarHeight),
    });
  });
}

export default scrollNavbarCallback;
