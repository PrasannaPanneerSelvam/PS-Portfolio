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
      } else {
        targetChildClassList.add('wrapUp');
        targetChildClassList.remove('showUp');
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
