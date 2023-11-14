import styles from './css/home.module.css';
import useRandomText from './../hooks/randomText';
import { getAppStateContext } from '../context/AppContext';
import { useMemo } from 'react';

const changeOneLetterAtOnce = Math.random() < 0.5;

const introPrefix = 'Hi, I am ';

const options = {
  changeOneLetterAtOnce: true,
  timing: 20,
  doMaxSwaps: false,
  maxSwaps: 3,
};

function Home({ reference }) {
  const { isMobileView } = getAppStateContext();

  const textToBeChanged = (isMobileView ? '' : introPrefix) + 'Prasanna';

  const [text, isDone] = useRandomText(textToBeChanged, options);

  const introDescriptionClassList = [styles.slider, styles.introText];

  if (isDone) introDescriptionClassList.push(styles.show);

  const returnValue = useMemo(() => {
    // const introTextStyles = {
    //   '--animationDuration': `${subText.length * 10}ms`,
    //   '--animationTimingFunction': `steps(${subText.length})`,
    // };

    return (
      <section ref={reference} className={styles.section}>
        <div>
          <h1 className={styles.heroText}>
            {isMobileView ? introPrefix + text : text}
          </h1>

          <h2 className={introDescriptionClassList.join(' ')}>
            Front end developer, I build things to make web cleaner
          </h2>
        </div>
      </section>
    );
  }, [text, isDone]);

  return returnValue;
}

export default Home;
