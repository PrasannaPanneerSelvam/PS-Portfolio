import { useEffect, useMemo, useRef, useState } from 'react';
import SocialMediaButtons from '../components/SocialMediaButtons';

import styles from './css/contact.module.css';
import ContentWrapper from '../components/ContentWrapper';
import { getAppStateContext } from '../context/AppContext';

const mailId = 'prasannaps2610@gmail.com';
// const mailId = 'hello@prasannaps.com';

// const copiedText = 'Mail id copied';
const copiedText = 'Mail id copied to clipboard';

// TODO :: Add some view for success & failure cases
const copyMailIdToClipBoard = (onCopiedCb) => {
  navigator.clipboard.writeText(mailId).then(
    function () {
      onCopiedCb(true);
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    }
  );
};

function Contact({ reference }) {
  const { currentPageIndex } = getAppStateContext();
  const expand = currentPageIndex == 3;
  const [isCopied, setCopied] = useState(false);
  const timeOutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeOutRef.current);
  }, []);

  return useMemo(() => {
    const copyIconOpacity = isCopied ? 0 : 1,
      copyDoneOpacity = !isCopied ? 0 : 1;
    return (
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
            <div
              className={styles.copyMailBox}
              onClick={() => {
                if (isCopied) return;
                copyMailIdToClipBoard(setCopied);
              }}
            >
              <div
                className={styles.copyMailContainer + ' ' + styles.iconHolder}
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 16 16"
                  style={{ opacity: copyDoneOpacity }}
                >
                  <use href="#tick-svg"></use>
                </svg>
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 64 64"
                  style={{ opacity: copyIconOpacity }}
                >
                  <use href="#copy-svg"></use>
                </svg>
              </div>

              <span className={styles.copyMailContainer}>
                <span
                  style={{ opacity: copyDoneOpacity }}
                  onTransitionEnd={() => {
                    if (!isCopied) return;
                    clearTimeout(timeOutRef.current);
                    timeOutRef.current = setTimeout(() => {
                      setCopied(false);
                    }, 800);
                  }}
                >
                  {copiedText}
                </span>
                <span style={{ opacity: copyIconOpacity }}>{mailId}</span>
                {mailId}
                {/* {(mailId.length > copiedText.length ? mailId : copiedText) +
                  'aa'} */}
              </span>
            </div>

            <SocialMediaButtons
              items={['linkedin', 'github', 'instagram', 'slack']}
              expand={expand}
            />
          </div>
        </ContentWrapper>
      </section>
    );
  }, [expand, reference, isCopied]);
}

export default Contact;
