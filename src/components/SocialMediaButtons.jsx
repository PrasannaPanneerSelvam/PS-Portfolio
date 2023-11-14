import { useEffect, useMemo, useRef } from 'react';
import styles from './css/socialMediaButtons.module.css';

function SocialMediaButtons({ expand, showAsHorizontal = true }) {
  const buttonRefs = useRef([]);

  useEffect(() => {
    buttonRefs.current.forEach((node) => {
      const animClass = expand ? styles.showUp : styles.wrapUp;
      node.classList.remove(styles.wrapUp, styles.showUp);
      node.classList.add(animClass);
    });
  }, [expand]);

  return useMemo(() => {
    const socialMediaItems = ['linkedin', 'mail', 'instagram', 'github'];

    const gap = 50,
      iconSize = 50,
      halfIconSize = iconSize / 2;

    const itemsCount = socialMediaItems.length,
      halfLength = Math.floor(itemsCount / 2),
      isEvenSize = itemsCount % 2 === 0,
      maxLength = (iconSize + gap) * itemsCount - gap,
      minLength = iconSize;

    const containerHeight = showAsHorizontal ? minLength : maxLength,
      containerWidth = showAsHorizontal ? maxLength : minLength;

    const startingLeftPosition = `${containerWidth / 2 - halfIconSize}px`,
      startingTopPosition = `${containerHeight / 2 - halfIconSize}px`;

    return (
      <ul
        className={styles.listHolder}
        style={{
          '--iconSize': `${iconSize}px`,
          height: `${containerHeight}px`,
          width: `${containerWidth}px`,
        }}
      >
        {socialMediaItems.map((mediaItem, idx) => {
          const elementStyles = { left: startingLeftPosition };

          if (!showAsHorizontal) {
            const finalTopPosition = idx * 100,
              verticalGapCount = idx;
            elementStyles['bottom'] = '0';
            elementStyles[
              '--final-top-position'
            ] = `calc(-${finalTopPosition}% - ${verticalGapCount * gap}px)`;
          } else {
            let finalLeftPosition = 0,
              finalTurn = 0,
              horizontalGapCount = 0;

            // Not a center one
            if (!(!isEvenSize && (idx + 1) * 2 === itemsCount + 1)) {
              const awayFromMiddle = idx - halfLength;

              horizontalGapCount = awayFromMiddle;
              finalLeftPosition = awayFromMiddle * 100;
              finalTurn = idx < itemsCount / 2 ? 1 : -1;
            }

            if (isEvenSize) {
              finalLeftPosition += 50;
              horizontalGapCount += 0.5;
            }

            elementStyles['top'] = startingTopPosition;
            elementStyles[
              '--final-left-position'
            ] = `calc(${finalLeftPosition}% + ${horizontalGapCount * gap}px)`;
            elementStyles['--final-turn'] = `${finalTurn}turn`;
          }

          return (
            <li
              key={`${idx}-${mediaItem[0]}`}
              className={styles.listItem}
              style={elementStyles}
              ref={(refVal) => {
                buttonRefs.current[idx] = refVal;
              }}
            >
              {mediaItem[0]}
            </li>
          );
        })}
      </ul>
    );
  }, []);
}

export default SocialMediaButtons;
