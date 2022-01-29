const toggleSideBarIcons = (function () {
  const stick = document.getElementById('social-media-vertical-stick'),
    stickElemsClassList = [...stick.getElementsByTagName('li')].map(
      i => i.classList
    );

  return function (doHide) {
    stick.parentElement.classList.toggle('hide', doHide);
    stick.parentElement.classList.toggle('show', !doHide);

    stickElemsClassList.forEach(item => {
      item.toggle('hide', doHide);
      item.toggle('show', !doHide);
    });
  };
})();

function activateSocialMediaAnimation() {
  const options = {
    threshold: 1,
    rootMargin: '-13% 0px -20% 0px',
  };

  const SocialMediaIconsObserver = new IntersectionObserver(entries => {
    socialMediaElems.forEach(icon => {
      const targetChildClassList = icon.classList;
      if (entries[0].isIntersecting) {
        targetChildClassList.add('showUp');
        targetChildClassList.remove('wrapUp');
        toggleSideBarIcons(true);
      } else {
        targetChildClassList.add('wrapUp');
        targetChildClassList.remove('showUp');
        toggleSideBarIcons(false);
      }
    });
  }, options);

  const socialMediaContainer = document.getElementById('social-media-list'),
    socialMediaElems = [...socialMediaContainer.getElementsByTagName('li')];

  socialMediaElems[0].onanimationstart = () => {
    SocialMediaIconsObserver.unobserve(socialMediaContainer);
  };
  socialMediaElems[0].onanimationend = () => {
    SocialMediaIconsObserver.observe(socialMediaContainer);
  };

  SocialMediaIconsObserver.observe(socialMediaContainer);

  return SocialMediaIconsObserver;
}

export default activateSocialMediaAnimation;
