const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers = "0123456789",
  alphaNums = alphabets + alphabets.toLowerCase() + numbers;

const getRandomAlphabet = function () {
  return function () {
    return alphaNums[Math.floor(Math.random() * 52)];
  };
};
const getRandomNumber = function () {
  return numbers[Math.floor(Math.random() * 10)];
};

const getRandomAlphaNum = function () {
  return alphaNums[Math.floor(Math.random() * 62)];
};

const getNonMatchingRandomLetter = (current, expected) => {
  let result = getRandomAlphaNum();

  while (current === result || expected === result)
    result = getRandomAlphaNum();

  return result;
};

const getRandomText = (sampleText) =>
  sampleText
    .split("")
    .map((letter) => {
      if (letter === " ") return letter;
      let result = getRandomAlphaNum();

      // Do force Randomize while aiming for max no. of swaps
      while (letter === result) result = getRandomAlphaNum();

      return result;
    })
    .join("");

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
    partToBeCompleted = currentText.slice(currentIndex).split("");

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

  return completedPart + partToBeCompleted.join("");
}

export { getNewRandomText, getRandomText };
