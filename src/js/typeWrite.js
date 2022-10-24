class TypeWriter {
  #element;
  #wordList;
  #typeTime;
  #waitTime;
  #wordIndex;
  #letterIndex;
  #reversing;
  #lastTimeOutId;
  constructor(elemId, wordList, typeTime = 200, waitTime = 600) {
    this.#element = document.getElementById(elemId);
    this.#wordList = wordList;
    this.#waitTime = waitTime;
    this.#typeTime = typeTime;
    this.#wordIndex = 0;
    this.#letterIndex = 0;
    this.#reversing = false;
    this.#lastTimeOutId = -1;

    this.#setDimensions();
    document.fonts.onloadingdone = () => this.#setDimensions();
  }

  #setDimensions() {
    const parent = this.#element.parentElement,
      container = parent.parentElement;

    // Resetting existing text content
    this.#element.innerText = '';
    if (parent.children.length === 2) {
      parent.firstElementChild.remove();
    }
    parent.style.height = parent.style.width = '';
    container.style.height = container.style.width = '';

    // Computing maximum possible height
    const oldHeight = getComputedStyle(container).height;

    const maxLengthyWord = this.#wordList.reduce(
      (acc, val) => (acc.length < val.length ? val : acc),
      ''
    );

    this.#element.innerText = maxLengthyWord;

    const { height, width } = getComputedStyle(container);

    container.style.height = height;
    container.style.width = width;

    this.#element.innerText = '';

    if (oldHeight !== height) {
      parent.insertBefore(document.createElement('br'), this.#element);
    }
  }

  setTypeWriterDimensionsAndUpdateParent() {
    clearTimeout(this.#lastTimeOutId);
    this.#setDimensions();
    this.update();
  }

  update() {
    const currentWord = this.#wordList[this.#wordIndex];
    const text = currentWord.slice(0, this.#letterIndex);

    let time = this.#typeTime / (this.#reversing ? 2 : 1);

    if (this.#reversing) {
      this.#letterIndex--;

      if (this.#letterIndex === 0) {
        this.#wordIndex = (this.#wordIndex + 1) % this.#wordList.length;
        this.#reversing = false;
      }
    } else {
      this.#letterIndex++;

      if (this.#letterIndex === currentWord.length + 1) {
        this.#reversing = true;
        time = this.#waitTime;
      }
    }

    this.#element.innerText = text;

    this.#lastTimeOutId = setTimeout(this.update.bind(this), time);
  }
}

export default TypeWriter;
