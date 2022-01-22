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
        targetChildClassList.remove('bounceOutRight')
      } else {
        targetChildClassList.add('bounceOutRight')
        targetChildClassList.remove('bounceInRight');
      }
    })
  }, options);


  const skillContainer = document.getElementById('skills-showcase'),
    skillElems = [...skillContainer.getElementsByTagName('li')];

  skillElems.forEach(skill => SkillObserver.observe(skill))

  return SkillObserver;
}

export default activateSkillShowCaseAnimation;