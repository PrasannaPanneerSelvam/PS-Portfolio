import { useEffect, useState } from 'react';

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers = '0123456789',
  alphaNums = alphabets + alphabets.toLowerCase() + numbers;

// const getRandomAlphabet = () => () => alphaNums[Math.floor(Math.random() * 52)];
// const getRandomNumber = () => numbers[Math.floor(Math.random() * 10)];
const getRandomAlphaNum = () => alphaNums[Math.floor(Math.random() * 62)];

function useRandomText(expectedText, options = {}) {
  const timing = options.timing ?? 30,
    doMaxSwaps = options.doMaxSwaps ?? false,
    maxSwaps = options.maxSwaps ?? 4,
    changeOneLetterAtOnce = options.changeOneLetterAtOnce ?? false;

  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swapCount, setSwapCount] = useState(0);

  const [prevExpectedText, setPrevExpectedText] = useState('');

  useEffect(() => {
    setPrevExpectedText(expectedText);

    const randomInitialText = expectedText
      .split('')
      .map((letter) => {
        if (letter === ' ') return letter;
        let result = getRandomAlphaNum();

        // Do force Randomize while aiming for max no. of swaps
        while (doMaxSwaps && letter === result) result = getRandomAlphaNum();

        return result;
      })
      .join('');

    setText(randomInitialText);
    setCurrentIndex(0);
    setSwapCount(0);

    console.log('finalText', prevExpectedText);
  }, [expectedText]);

  useEffect(() => {
    if (prevExpectedText !== expectedText) return;

    // Don't run on Component Mounting
    if (text === '') return;

    // Don't run once all characters are set correctly
    if (currentIndex === text.length) return;

    if (text[currentIndex] === expectedText[currentIndex]) {
      setCurrentIndex((crctIdx) => crctIdx + 1);
      setSwapCount(0);
      return;
    }

    const prev = text,
      currentIndexClone = currentIndex;

    const timeoutId = setTimeout(() => {
      let newLetter =
        swapCount >= maxSwaps
          ? expectedText[currentIndexClone]
          : getRandomAlphaNum();

      // Get a new random letter
      while (newLetter === prev[currentIndexClone])
        newLetter = getRandomAlphaNum();

      if (doMaxSwaps && swapCount < maxSwaps) {
        while (
          newLetter === prev[currentIndexClone] ||
          newLetter === expectedText[currentIndexClone]
        )
          newLetter = getRandomAlphaNum();
      }

      if (newLetter === expectedText[currentIndexClone]) {
        setCurrentIndex((crctIdx) => crctIdx + 1);
        setSwapCount(0);
      } else {
        setSwapCount((i) => i + 1);
      }

      let restLetters = prev.slice(currentIndexClone + 1);

      if (!changeOneLetterAtOnce) {
        restLetters = restLetters
          .split('')
          .map((letter) => (letter === ' ' ? letter : getRandomAlphaNum()))
          .join('');
      }

      const newWord =
        prev.slice(0, currentIndexClone) + newLetter + restLetters;

      if (newWord.length === expectedText.length) setText(newWord);
      else {
        console.log('Diff', newWord, prev, expectedText, prevExpectedText);
      }

      return () => {
        clearTimeout(timeoutId);
      };
    }, timing);
  }, [text, currentIndex]);

  useEffect(() => {
    console.log('Mounting');
  }, []);

  return text;
}

export default useRandomText;
