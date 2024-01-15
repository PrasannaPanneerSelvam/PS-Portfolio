import styles from './css/sectionHeader.module.css';

function SectionHeader({ headerText }) {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.line} style={{ width: '1.75rem' }}></div>
      <h1>{headerText}</h1>
      <div className={styles.line} style={{ flex: '1' }}></div>
    </div>
  );
}

export default SectionHeader;
