// const NavigationBar = (function () {
//   const slider = document.getElementById('nav-items-holder'),
//     hamburgerButtonContainer = document.getElementById(
//       'ham-burger-button-container'
//     ),
//     hamburgerButton = document.getElementById('ham-burger-button'),
//     secondContainer = document.getElementById('second-container');

//   let isOpened = false;

//   function toggleSideBar() {
//     slider.classList.toggle('active');
//     hamburgerButton.classList.toggle('active');
//     secondContainer.classList.toggle('active');
//     isOpened = !isOpened;
//   }

//   slider.addEventListener('click', e => {
//     e.stopPropagation();
//   });

//   hamburgerButtonContainer.addEventListener('click', toggleSideBar);
//   secondContainer.addEventListener('click', () => {
//     if (isOpened) toggleSideBar();
//   });

//   return { toggleSideBar };
// })();

// let doNothingOnScrollBar = false;

// function scrollNavbarCallback() {
//   const navbar = document.getElementById('navigation-bar');

//   let lastScrollPosition = window.pageYOffset,
//     active = true;

//   return () => {
//     const currentScroll = window.pageYOffset,
//       scrollingUpwards = lastScrollPosition > currentScroll;

//     lastScrollPosition = currentScroll;

//     if (doNothingOnScrollBar) {
//       doNothingOnScrollBar = false;
//       return;
//     }

//     if (!active && scrollingUpwards) {
//       active = true;
//       navbar.classList.remove('hide-nav');
//       navbar.classList.add('show-nav');
//     } else if (active && !scrollingUpwards) {
//       active = false;
//       navbar.classList.remove('show-nav');
//       navbar.classList.add('hide-nav');
//     }
//   };
// }

// function setNavigationClicks(smoothScrollCb) {
//   // Setting navigation tour for nav list items
//   const navBarListItems = document.getElementsByClassName('nav-item-list-item'),
//     navbarComputedStyleObject = getComputedStyle(
//       document.getElementsByClassName('first-container')[0]
//     );

//   for (let idx = 0; idx < navBarListItems.length; idx++) {
//     const targetClassName = navBarListItems[idx].dataset.targetSection,
//       targetElement = document.getElementsByClassName(targetClassName)[0];

//     navBarListItems[idx].addEventListener('click', () => {
//       NavigationBar.toggleSideBar();

//       // TODO :: Cache the offset value if needed
//       const navbarHeight = parseInt(
//           navbarComputedStyleObject.height.split('px')[0]
//         ), //+ 10, // No need for offset in case of centered content
//         targetOffset = targetElement.offsetTop;

//       doNothingOnScrollBar = true;

//       smoothScrollCb(targetOffset);
//       window.scrollTo({
//         top: targetOffset,
//       });
//     });
//   }

//   const quickContactBtn = document.getElementById('quick-contact-btn'),
//     targetClassName = quickContactBtn.dataset.targetSection,
//     targetElement = document.getElementsByClassName(targetClassName)[0];

//   quickContactBtn.addEventListener('click', () => {
//     // TODO :: Cache the offset value if needed
//     const navbarHeight =
//         parseInt(navbarComputedStyleObject.height.split('px')[0]) + 10,
//       targetOffset = targetElement.offsetTop;

//     doNothingOnScrollBar = true;
//     smoothScrollCb(targetOffset);
//     window.scrollTo({
//       top: targetOffset,
//     });
//   });
// }

// export { scrollNavbarCallback, setNavigationClicks };

function fixResizeAnimations() {
  let resizeTimer: NodeJS.Timeout;
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
const navBarListItems = document.getElementsByClassName('nav-item-list-item'),
  navbarComputedStyleObject = getComputedStyle(
    document.getElementsByClassName('first-container')[0]
  );

for (let idx = 0; idx < navBarListItems.length; idx++) {
  const liElem = navBarListItems[idx] as HTMLUListElement,
    targetClassName = liElem.dataset.targetSection,
    targetElement = document.getElementsByClassName(targetClassName)[0] as HTMLElement;

    liElem.addEventListener('click', () => {
    NavigationBar.toggleSideBar();

    // TODO :: Cache the offset value if needed
    const navbarHeight =
        parseInt(navbarComputedStyleObject.height.split('px')[0]) + 10,
      targetOffset = targetElement?.offsetTop;

    doNothingOnScrollBar = true;
    window.scrollTo({
      top: targetOffset, // - (targetOffset === 0 ? 0 : navbarHeight),
    });
  });
}

const quickContactBtn = document.getElementById('quick-contact-btn'),
  targetClassName = quickContactBtn.dataset.targetSection,
  targetElement = document.getElementsByClassName(targetClassName)[0] as HTMLElement;

quickContactBtn.addEventListener('click', () => {
  // TODO :: Cache the offset value if needed
  const navbarHeight =
      parseInt(navbarComputedStyleObject.height.split('px')[0]) + 10,
    targetOffset = targetElement?.offsetTop;

  doNothingOnScrollBar = true;
  window.scrollTo({
    top: targetOffset, // - (targetOffset === 0 ? 0 : navbarHeight),
  });
});

const setNavigationClicks = (_: any) => {};

export { scrollNavbarCallback, setNavigationClicks };
