function activateSkillShowCaseAnimation() {
  const options = {
    threshold: 1,
    rootMargin: '-13% 0px -20% 0px',
  };

  const SkillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const targetChildClassList = entry.target.children[0].classList;

      if (entry.isIntersecting) {
        targetChildClassList.add('bounceInRight');
        targetChildClassList.remove('bounceOutRight');
      } else {
        targetChildClassList.add('bounceOutRight');
        targetChildClassList.remove('bounceInRight');
      }
    });
  }, options);

  const skillContainer = document.getElementById('skills-showcase'),
    skillElems = [...skillContainer.getElementsByTagName('li')];

  skillElems.forEach(skill => SkillObserver.observe(skill));

  return SkillObserver;
}

const setContainerSize = (function () {
  const totalWrapperStyles = document.getElementById('center-wrapper').style,
    content = document.getElementById('about-me-content'),
    skills = document.getElementById('skills-showcase');

  return function () {
    let newWidth = '';

    // Resetting width to allow CSS to do its job for flex-wrapping
    totalWrapperStyles.setProperty('width', newWidth);

    const contentDimDetails = content.getBoundingClientRect(),
      skillsDimDetails = skills.getBoundingClientRect();

    if (contentDimDetails.y !== skillsDimDetails.y) {
      newWidth = `${contentDimDetails.width}px`;
    }

    totalWrapperStyles.setProperty('width', newWidth);
  };
})();

setContainerSize();

export { activateSkillShowCaseAnimation, setContainerSize };
