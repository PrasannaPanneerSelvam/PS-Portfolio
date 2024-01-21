import styles from './css/contactIcons.module.css';

export default {
  linkedin: (
    <a
      className={styles.contactIconAnchor}
      style={{ paddingLeft: '2px' }}
      href="https://www.linkedin.com/in/prasanna-ps/"
      target="blank"
      aria-label="LinkedIn"
      rel="noreferrer"
    >
      <svg height="30" width="30" viewBox="0 0 25 25">
        <use href="#linkedin-svg"></use>
      </svg>
    </a>
  ),
  github: (
    <a
      className={styles.contactIconAnchor}
      style={{ paddingLeft: '2px', paddingTop: '2px' }}
      href="https://github.com/PrasannaPanneerSelvam"
      target="blank"
      aria-label="GitHub"
      rel="noreferrer"
    >
      <svg height="30" width="30" viewBox="0 0 25 25">
        <use href="#github-svg"></use>
      </svg>
    </a>
  ),
  instagram: (
    <a
      className={styles.contactIconAnchor}
      href="https://www.instagram.com/prithiv_krish/"
      target="blank"
      aria-label="Instagram"
      rel="noreferrer"
    >
      <svg height="25" width="25" viewBox="0 0 25 25">
        <use href="#instagram-svg"></use>
      </svg>
    </a>
  ),
  mail: (
    <a
      className={styles.contactIconAnchor}
      href="mailto:prasannaps2610@gmail.com"
      target="blank"
      aria-label="Mail"
      rel="noreferrer"
    >
      <svg height="35" width="35" viewBox="110 110 790 790">
        <use href="#mail-svg"></use>
      </svg>
    </a>
  ),
  slack: (
    <a
      className={styles.contactIconAnchor}
      href="mailto:prasannaps2610@gmail.com"
      target="blank"
      aria-label="Mail"
      rel="noreferrer"
    >
      <svg height="35" width="35" viewBox="0 0 48 48">
        {/* <svg height="28" width="28" viewBox="0 0 32 32"> */}
        <use href="#slack-svg"></use>
      </svg>
    </a>
  ),
};
