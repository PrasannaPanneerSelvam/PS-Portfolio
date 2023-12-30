import styles from './css/contactIcons.module.css';

export const socialMediaSvgs = {
  linkedin: (
    <a
      className={styles.contactIconAnchor}
      style={{ paddingLeft: '2px' }}
      href="https://www.linkedin.com/in/prasanna-p-61956a163/"
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
};

function ContactIcons() {
  return (
    <>
      <svg className={styles.hideSvg}>
        <symbol id="mail-svg">
          <title>Mail id</title>
          <path
            className={styles.fillWithPrimaryColor}
            d="M219.3,310.3h12.1c179.7,0,359.4,0.1,539-0.1c8.1,0,10.5,2,10.5,10.4c-0.1,119.8-0.1,239.7,0,359.5c0,7.7-2.3,9.7-9.6,9.7c-180.8-0.3-361.7-0.3-542.5-0.1c-6.3,0-9.6-0.7-9.6-8.6c0.3-119.5,0.2-239,0.1-358.6V310.3L219.3,310.3z M263.6,335c3.5,3.6,4.9,5.3,6.8,7c60.3,55.5,120.5,110.9,181,166.4c9.6,8.9,19.5,17.7,30.3,25.4c12.2,8.6,25.8,8.7,37.7-0.7c12.6-9.7,24.4-20.3,36.1-31.1c57.6-52.6,115-105.4,172.4-158.3c2.5-2.2,4.5-4.9,7.7-8.8C577.7,335,421.9,335,263.6,335L263.6,335z M262.9,661.9c1,1.2,1.8,2.2,2.8,3.3h469c0.7-0.9,1.2-1.8,1.6-2.8c-3.2-2.4-6.8-4.7-9.7-7.5c-48.3-44.2-96.7-88.3-144.6-132.8c-6.4-5.8-9.8-5-15.5,0.3c-12.3,11.2-24.8,21.9-38,31.9c-18.4,13.9-37.9,14.3-56.6,0.3c-13.5-10.3-26.4-21.5-39.2-32.9c-5.4-5-8.7-4.9-14.1,0.1c-48.5,44.9-97.3,89.4-146,134.1C269.9,658.3,266.2,660,262.9,661.9L262.9,661.9z M409,500c-54.4-49.8-107.8-99-162.7-149.2v298.7C301.4,598.8,354.7,549.9,409,500L409,500z M754.3,353.9c-0.9-0.5-1.7-0.9-2.5-1.4c-53.3,49-106.4,98-160.5,147.5c54.5,50.1,107.8,99,162.9,149.6C754.3,549.2,754.3,451.6,754.3,353.9L754.3,353.9z"
          ></path>
        </symbol>
      </svg>

      <svg className={styles.hideSvg}>
        <symbol id="instagram-svg">
          <title>Instagram</title>
          <rect
            className={styles.justStroke}
            x="1.5"
            y="1.5"
            width="22"
            height="22"
            rx="6.25"
            ry="6.25"
            strokeWidth="1.5"
          ></rect>

          <circle
            className={styles.justStroke}
            strokeWidth="1.5"
            r="4"
            cx="12.5"
            cy="12.5"
          />

          <circle className={styles.fillColor} r="1.4" cx="18.5" cy="6.5" />
        </symbol>
      </svg>

      <svg className={styles.hideSvg}>
        <symbol id="github-svg">
          <title>GitHub</title>
          <path
            className={styles.justStroke}
            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
          ></path>
        </symbol>
      </svg>

      <svg className={styles.hideSvg}>
        <symbol id="linkedin-svg">
          <title>LinkedIn</title>
          <path
            className={styles.justStroke}
            d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
          ></path>
          <rect
            className={styles.justStroke}
            x="2"
            y="9"
            width="4"
            height="12"
          ></rect>
          <circle className={styles.justStroke} cx="4" cy="4" r="2"></circle>
        </symbol>
      </svg>
    </>
  );
}

export default ContactIcons;
