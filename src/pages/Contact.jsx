import { useEffect, useMemo, useState } from 'react';
import SocialMediaButtons from '../components/SocialMediaButtons';

import styles from './css/contact.module.css';

function Contact({ reference }) {
  const [expand, setExpand] = useState(true);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setExpand((i) => !i);
  //   }, 2000);

  //   return () => clearTimeout(timeoutId);
  // }, [expand]);

  return useMemo(
    () => (
      <section ref={reference} className={styles.section}>
        <div>
          <h1>Get In Touch</h1>
          <p>
            I am interested in new opportunities, especially ambitious and
            challenging projects. My inbox is always open. I'll try my best to
            get back to you!
          </p>

          <SocialMediaButtons expand={expand}></SocialMediaButtons>
        </div>
      </section>
    ),
    [expand]
  );
}

export default Contact;
