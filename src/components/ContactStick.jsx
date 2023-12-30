import { useEffect, useState } from 'react';
import SocialMediaButtons from './SocialMediaButtons';
import styles from './css/contactStick.module.css';
import { getAppStateContext } from '../context/AppContext';

function ContactStick() {
  const { isHeroAnimPending } = getAppStateContext();
  const [showStick, setShowStick] = useState(false);
  const [expand, setExpand] = useState(false);

  const show = !isHeroAnimPending;

  useEffect(() => {
    if (show === true) {
      setShowStick(true);
    } else if (expand !== false) {
      setExpand(false);
    }
  }, [show]);

  return (
    <div
      className={[
        styles.contactStickWrapper,
        showStick ? styles.showStick : '',
      ].join(' ')}
      onAnimationEnd={() => {
        if (showStick) setExpand(true);
      }}
    >
      <SocialMediaButtons
        expand={expand}
        showAsHorizontal={false}
      ></SocialMediaButtons>
      <div className={styles.stick}></div>
    </div>
  );
}

export default ContactStick;
