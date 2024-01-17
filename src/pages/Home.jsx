import styles from './css/home.module.css';
import useRandomText from './../hooks/randomText';
import { getAppStateContext } from '../context/AppContext';
import { useMemo } from 'react';

// const changeOneLetterAtOnce = Math.random() < 0.5;

const introPrefix = "Hi, I'm ";

const options = {
  changeOneLetterAtOnce: true,
  timing: 15,
  doMaxSwaps: false,
  maxSwaps: 3,
};

function Home({ reference }) {
  const { setHeroAnimPending } = getAppStateContext();

  const isMobileView = true;

  const textToBeChanged = (isMobileView ? '' : introPrefix) + 'Prasanna';

  if (isMobileView) options.timing = 30;

  const [text, isDone] = useRandomText(textToBeChanged, options);

  const introDescriptionClassList = useMemo(() => {
    return [styles.slider, styles.introText, isDone ? styles.show : ''];
  }, [isDone]);

  const returnValue = useMemo(() => {
    const textValue = text === null ? '' : text;
    // const introTextStyles = {
    //   '--animationDuration': `${subText.length * 10}ms`,
    //   '--animationTimingFunction': `steps(${subText.length})`,
    // };

    return (
      <section ref={reference} className={styles.section} id="home">
        <div>
          <h2 className={styles.hiText}>{introPrefix}</h2>
          <h1 className={styles.heroText}>{textValue}</h1>

          <h2
            style={{ display: 'block' }}
            className={introDescriptionClassList.join(' ')}
            onAnimationEnd={() => setHeroAnimPending(false)}
          >
            {/* Coding the future, pixel by pixel */}
            Designing the Future with Code and Elegance
            {/* Front end developer, I build things to make web cleaner */}
          </h2>
        </div>
      </section>
    );
  }, [
    text,
    isMobileView,
    introDescriptionClassList,
    reference,
    setHeroAnimPending,
  ]);

  return returnValue;
}

export default Home;
