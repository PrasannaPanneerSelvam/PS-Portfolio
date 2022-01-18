class TypeWriter {
  #element;
  #wordList;
  #typeTime;
  #waitTime;
  #wordIndex;
  #letterIndex;
  #reversing;
  constructor(elemId, wordList, typeTime = 200, waitTime = 600) {
    this.#element = document.getElementById(elemId);
    this.#wordList = wordList;
    this.#waitTime = waitTime;
    this.#typeTime = typeTime;
    this.#wordIndex = 0;
    this.#letterIndex = 0;
    this.#reversing = false;
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

    setTimeout(this.update.bind(this), time);
  }
}

export default TypeWriter;
