import styles from './css/home.module.css';
import useRandomText from './../hooks/randomText';
import { getAppStateContext } from '../context/AppContext';
import { useMemo } from 'react';

// const changeOneLetterAtOnce = Math.random() < 0.5;

const introPrefix = 'Hi, I am ';

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
    // const introTextStyles = {
    //   '--animationDuration': `${subText.length * 10}ms`,
    //   '--animationTimingFunction': `steps(${subText.length})`,
    // };

    return (
      <section ref={reference} className={styles.section} id="home">
        <div>
          <h1 className={styles.heroText}>
            {isMobileView ? introPrefix + text : text}
          </h1>

          <h2
            className={introDescriptionClassList.join(' ')}
            onAnimationEnd={() => setHeroAnimPending(false)}
          >
            Front end developer, I build things to make web cleaner
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
