import styles from './css/home.module.css';
import useRandomText from './../hooks/randomText';
import { getAppStateContext } from '../context/AppContext';
import { useMemo } from 'react';

// const changeOneLetterAtOnce = Math.random() < 0.5;

const introPrefix = "Hi, I'm ";

const options = {
  changeOneLetterAtOnce: true,
  timing: 30,
  doMaxSwaps: false,
  maxSwaps: 3,
};

function Home({ reference }) {
  const { setHeroAnimPending } = getAppStateContext();
  const [text, isDone] = useRandomText('Prasanna', options);

  const returnValue = useMemo(() => {
    const introDescriptionClassList = `${styles.slider} ${styles.introText} ${
      isDone ? styles.show : ''
    }`;
    const isEmptyHeroText = text === null;
    // const introTextStyles = {
    //   '--animationDuration': `${subText.length * 10}ms`,
    //   '--animationTimingFunction': `steps(${subText.length})`,
    // };

    return (
      <section ref={reference} className={styles.section} id="home">
        <div>
          <h2 className={styles.hiText}>
            {isEmptyHeroText ? '' : introPrefix}
          </h2>
          <h1 className={styles.heroText}>{isEmptyHeroText ? '' : text}</h1>

          <h2
            style={{ display: 'block' }}
            className={introDescriptionClassList}
            onAnimationEnd={() => setHeroAnimPending(false)}
          >
            {/* Coding the future, pixel by pixel */}
            Designing the Future with Code and Elegance
            {/* Front end developer, I build things to make web cleaner */}
          </h2>
        </div>
      </section>
    );
  }, [text, reference, setHeroAnimPending, isDone]);

  return returnValue;
}

export default Home;
