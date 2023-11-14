import { useEffect, useState } from 'react';
import SocialMediaButtons from './SocialMediaButtons';
import styles from './css/contactStick.module.css';

function ContactStick() {
  const [expand, setExpand] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setExpand((i) => !i);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [expand]);

  return (
    <div className={styles.contactStickWrapper}>
      <SocialMediaButtons
        expand={expand}
        showAsHorizontal={false}
      ></SocialMediaButtons>
      <div className={styles.stick}></div>
    </div>
  );
}

export default ContactStick;
