import { useEffect, useState } from 'react';

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers = '0123456789',
  alphaNums = alphabets + alphabets.toLowerCase() + numbers;

const getRandomAlphabet = () => () => alphaNums[Math.floor(Math.random() * 52)];
const getRandomNumber = () => numbers[Math.floor(Math.random() * 10)];
const getRandomAlphaNum = () => alphaNums[Math.floor(Math.random() * 62)];

const getNonMatchingRandomLetter = (current, expected) => {
  let result = getRandomAlphaNum();

  while (current === result || expected === result)
    result = getRandomAlphaNum();

  return result;
};

const getRandomText = (sampleText) =>
  sampleText
    .split('')
    .map((letter) => {
      if (letter === ' ') return letter;
      let result = getRandomAlphaNum();

      // Do force Randomize while aiming for max no. of swaps
      while (letter === result) result = getRandomAlphaNum();

      return result;
    })
    .join('');

function getNewRandomText({
  currentText,
  expectedText,
  currentIndex,
  currentSwapCount,
  doMaxSwaps,
  maxSwaps,
  changeOneLetterAtOnce,
}) {
  const completedPart = currentText.slice(0, currentIndex),
    partToBeCompleted = currentText.slice(currentIndex).split('');

  if (currentSwapCount === maxSwaps) {
    partToBeCompleted[0] = expectedText[currentIndex];
  } else if (doMaxSwaps) {
    partToBeCompleted[0] = getNonMatchingRandomLetter(
      partToBeCompleted[0],
      expectedText[currentIndex]
    );
  } else {
    partToBeCompleted[0] = getRandomText(partToBeCompleted[0]);
  }

  for (
    let idx = 1;
    !changeOneLetterAtOnce && idx < partToBeCompleted.length;
    idx++
  )
    partToBeCompleted[idx] = getRandomText(partToBeCompleted[idx]);

  return completedPart + partToBeCompleted.join('');
}

function useRandomText(expectedText, options = {}) {
  const timing = options.timing ?? 30,
    doMaxSwaps = options.doMaxSwaps ?? false,
    maxSwaps = options.maxSwaps ?? 4,
    changeOneLetterAtOnce = options.changeOneLetterAtOnce ?? false;

  const [text, setText] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [swapCount, setSwapCount] = useState(null);

  const incrementCurrentIndexWrapper = () => {
    setCurrentIndex(currentIndex + 1);
    setSwapCount(0);
  };

  /**
   * Resetting state incase input text update
   * */
  let isExpectedTextChanged = false;
  useEffect(() => {
    isExpectedTextChanged = true;
    setText(getRandomText(expectedText));
    setCurrentIndex(0);
    setSwapCount(0);
  }, [expectedText]);

  /**
   * Code to switch letters
   * `currentIndex` is added in dependency array to handle no change on `space` character indices
   */
  useEffect(() => {
    if (isExpectedTextChanged === true) return;

    if (currentIndex === text.length) return;

    if (expectedText[currentIndex] === ' ') {
      incrementCurrentIndexWrapper();
      return;
    }

    const timeOutId = setTimeout(() => {
      const newText = getNewRandomText({
        currentText: text,
        expectedText,
        currentIndex,
        currentSwapCount: swapCount,
        doMaxSwaps,
        maxSwaps,
        changeOneLetterAtOnce,
      });

      if (newText[currentIndex] === expectedText[currentIndex]) {
        incrementCurrentIndexWrapper();
      } else {
        setSwapCount(swapCount + 1);
      }

      setText(newText);
    }, timing);

    return () => clearTimeout(timeOutId);
  }, [text, currentIndex]);

  return [text, currentIndex === text?.length];
}
export default useRandomText;
