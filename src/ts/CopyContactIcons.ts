function CopyContactIcons() {
  const listContainer = document.getElementById('social-media-vertical-stick'),
    targetContainer = document.getElementById('social-media-list'),
    listIcons = listContainer.children;

  for (let idx = 0; idx < listIcons.length; idx++) {
    let listItem = listIcons[idx].cloneNode(true) as HTMLElement;
    listItem.classList.remove('vertical');
    targetContainer.appendChild(listItem);
  }
}

export default CopyContactIcons;
