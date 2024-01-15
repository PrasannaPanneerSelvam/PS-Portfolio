import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import SocialMediaButtons from './SocialMediaButtons';
import styles from './css/contactStick.module.css';

function ContactStick({ show }) {
  const [showStick, setShowStick] = useState(false);
  const [expand, setExpand] = useState(false);

  // TODO :: Fix this temporary hack
  const isAlreadyShown = useRef(show);

  useEffect(() => {
    show ? setShowStick(true) : setExpand(false);
    isAlreadyShown.current = isAlreadyShown.current || show;
  }, [show]);

  return (
    <div
      className={[
        styles.contactStickWrapper,
        showStick ? styles.showStick : isAlreadyShown ? styles.hideStick : '',
      ].join(' ')}
      style={isAlreadyShown.current ? {} : { display: 'none' }}
      onAnimationEnd={() => {
        if (showStick) setExpand(true);
      }}
    >
      <SocialMediaButtons
        items={['slack', 'mail', 'instagram', 'github', 'linkedin']}
        expand={expand}
        showAsHorizontal={false}
        onAnimEnd={() => {
          setShowStick(expand);
        }}
      />
      <div className={styles.stick}></div>
    </div>
  );
}

ContactStick.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default ContactStick;
