import { useMemo } from 'react';
import SocialMediaButtons from '../components/SocialMediaButtons';

import styles from './css/contact.module.css';
import ContentWrapper from '../components/ContentWrapper';
import { getAppStateContext } from '../context/AppContext';

const mailId = 'prasannaps2610@gmail.com';
// const mailId = 'hello@prasannaps.com';

// TODO :: Add some view for success & failure cases
const copyMailIdToClipBoard = () => {
  navigator.clipboard.writeText(mailId).then(
    function () {
      console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    }
  );
};

function Contact({ reference }) {
  const { currentPageIndex } = getAppStateContext();
  const expand = currentPageIndex == 3;

  return useMemo(
    () => (
      <section ref={reference} className={styles.section} id="contact">
        <ContentWrapper headerText="Get In Touch">
          <p>
            I am interested in new opportunities, especially ambitious and
            challenging projects. My inbox is always open. I&apos;ll try my best
            to get back to you!
          </p>

          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              gap: '2rem',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div className={styles.copyMailBox} onClick={copyMailIdToClipBoard}>
              <svg viewBox="0 0 64 64" height="25" width="25">
                <use href="#copy-svg"></use>
              </svg>
              <span>{mailId}</span>
            </div>

            <SocialMediaButtons
              items={['linkedin', 'github', 'instagram', 'slack']}
              expand={expand}
            />
          </div>
        </ContentWrapper>
      </section>
    ),
    [expand, reference]
  );
}

export default Contact;
