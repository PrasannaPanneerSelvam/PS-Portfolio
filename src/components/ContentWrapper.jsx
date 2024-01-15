import styles from './css/contentWrapper.module.css';
import SectionHeader from './SectionHeader';

function ContentWrapper({ headerText, children }) {
  return (
    <div className={styles.contentWrapper}>
      <SectionHeader headerText={headerText} />
      <div>{children}</div>
    </div>
  );
}

export default ContentWrapper;
