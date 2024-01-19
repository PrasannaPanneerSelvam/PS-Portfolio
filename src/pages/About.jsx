import ContentWrapper from '../components/ContentWrapper';
import commonStyles from './../common.module.css';
import styles from './css/about.module.css';
import { getAppStateContext } from '../context/AppContext';

function About({ reference }) {
  const { currentPageIndex } = getAppStateContext();

  const styleObject = {
    animationName:
      currentPageIndex === 1 ? commonStyles.show : commonStyles.hide,
  };
  return (
    <section ref={reference} id="about" className={styles.section}>
      <div style={styleObject}>
        <ContentWrapper headerText="About me">
          <p style={{ maxWidth: '60ch', textIndent: '2rem' }}>
            I&apos;ve transitioned into programming by coding mini bots for fun,
            finding joy in creating virtual entities that impact the real world.
            Learnt data structures to make the process smoother and faster.
          </p>
          <p style={{ maxWidth: '60ch', textIndent: '2rem', marginTop: '1ch' }}>
            Fast-forward to today, I am working as a software engineer, building
            highly scalable cross platform front-end products at a{' '}
            <a href="https://juspay.in/" target="_blank" rel="noreferrer">
              Fintech startup
            </a>
            .
          </p>
        </ContentWrapper>
      </div>
    </section>
  );
}

export default About;
