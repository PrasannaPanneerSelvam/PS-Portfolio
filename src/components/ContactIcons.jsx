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
      onAnimationEnd={(e) => e.stopPropagation()}
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

function ContactIcons() {
  return (
    <>
      <svg className={styles.hideSvg}>
        <symbol id="mail-svg">
          <title>Mail id</title>
          <path
            className={styles.fillColor}
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

      <svg className={styles.hideSvg}>
        <symbol id="copy-svg">
          <path
            className={styles.fillColor}
            d="M40.63,13H12.38A4.69,4.69,0,0,0,7.7,17.67V57.31A4.69,4.69,0,0,0,12.38,62H40.63a4.69,4.69,0,0,0,4.69-4.69V17.67A4.69,4.69,0,0,0,40.63,13Zm2.69,44.33A2.69,2.69,0,0,1,40.63,60H12.38A2.69,2.69,0,0,1,9.7,57.31V17.67A2.69,2.69,0,0,1,12.38,15H40.63a2.69,2.69,0,0,1,2.69,2.69Z"
          ></path>
          <path
            className={styles.fillColor}
            d="M51.74,2H23.26a4.58,4.58,0,0,0-4.58,4.57v3.55a1,1,0,0,0,2,0V6.57A2.58,2.58,0,0,1,23.26,4H51.74A2.57,2.57,0,0,1,54.3,6.57V46.44A2.58,2.58,0,0,1,51.74,49H48.5a1,1,0,0,0,0,2h3.24a4.58,4.58,0,0,0,4.57-4.58V6.57A4.57,4.57,0,0,0,51.74,2Z"
          ></path>
        </symbol>
      </svg>

      <svg className={styles.hideSvg}>
        <symbol id="slack-svg">
          <title>Slack</title>
          {/* <path
            className={styles.justStroke}
            d="M15.36,7.36H12c-1.853,0-3.36-1.507-3.36-3.36S10.147,0.64,12,0.64S15.36,2.147,15.36,4V7.36z M12,1.36 c-1.456,0-2.64,1.185-2.64,2.64S10.544,6.64,12,6.64h2.64V4C14.64,2.544,13.456,1.36,12,1.36z M12,15.36H4 c-1.853,0-3.36-1.507-3.36-3.36S2.147,8.64,4,8.64h8c1.853,0,3.36,1.507,3.36,3.36S13.853,15.36,12,15.36z M4,9.36 c-1.456,0-2.64,1.185-2.64,2.64S2.544,14.64,4,14.64h8c1.456,0,2.64-1.185,2.64-2.64S13.456,9.36,12,9.36H4z M28,15.36h-3.36V12 c0-1.853,1.508-3.36,3.36-3.36s3.36,1.507,3.36,3.36S29.853,15.36,28,15.36z M25.36,14.64H28c1.456,0,2.64-1.185,2.64-2.64 S29.456,9.36,28,9.36s-2.64,1.185-2.64,2.64V14.64z M20,15.36c-1.853,0-3.36-1.507-3.36-3.36V4c0-1.853,1.507-3.36,3.36-3.36 S23.36,2.147,23.36,4v8C23.36,13.853,21.853,15.36,20,15.36z M20,1.36c-1.456,0-2.64,1.185-2.64,2.64v8 c0,1.456,1.184,2.64,2.64,2.64s2.64-1.185,2.64-2.64V4C22.64,2.544,21.456,1.36,20,1.36z M20,31.36c-1.853,0-3.36-1.508-3.36-3.36 v-3.36H20c1.853,0,3.36,1.508,3.36,3.36S21.853,31.36,20,31.36z M17.36,25.36V28c0,1.456,1.184,2.64,2.64,2.64s2.64-1.184,2.64-2.64 s-1.184-2.64-2.64-2.64H17.36z M28,23.36h-8c-1.853,0-3.36-1.508-3.36-3.36s1.507-3.36,3.36-3.36h8c1.853,0,3.36,1.507,3.36,3.36 S29.853,23.36,28,23.36z M20,17.36c-1.456,0-2.64,1.184-2.64,2.64s1.184,2.64,2.64,2.64h8c1.456,0,2.64-1.184,2.64-2.64 s-1.184-2.64-2.64-2.64H20z M4,23.36c-1.853,0-3.36-1.508-3.36-3.36S2.147,16.64,4,16.64h3.36V20C7.36,21.853,5.853,23.36,4,23.36z M4,17.36c-1.456,0-2.64,1.184-2.64,2.64S2.544,22.64,4,22.64S6.64,21.456,6.64,20v-2.64H4z M12,31.36 c-1.853,0-3.36-1.508-3.36-3.36v-8c0-1.853,1.507-3.36,3.36-3.36s3.36,1.507,3.36,3.36v8C15.36,29.853,13.853,31.36,12,31.36z M12,17.36c-1.456,0-2.64,1.184-2.64,2.64v8c0,1.456,1.185,2.64,2.64,2.64s2.64-1.184,2.64-2.64v-8 C14.64,18.544,13.456,17.36,12,17.36z"
          ></path> */}
          <path
            className={styles.justStroke}
            style={{ strokeWidth: 1.8 }}
            d="M19.06,5.5a3.7,3.7,0,0,0,0,7.4h3.7V9.2a3.69,3.69,0,0,0-3.68-3.7h0m0,9.86H9.2a3.7,3.7,0,1,0,0,7.4h9.86a3.7,3.7,0,1,0,0-7.4"
          ></path>
          <path
            className={styles.justStroke}
            style={{ strokeWidth: 1.8 }}
            d="M42.5,19.06a3.7,3.7,0,0,0-7.4,0h0v3.7h3.7a3.7,3.7,0,0,0,3.7-3.7m-9.86,0V9.2a3.7,3.7,0,1,0-7.4,0v9.86a3.7,3.7,0,0,0,7.4,0"
          ></path>
          <path
            className={styles.justStroke}
            style={{ strokeWidth: 1.8 }}
            d="M28.94,42.5a3.7,3.7,0,0,0,0-7.4h-3.7v3.7a3.7,3.7,0,0,0,3.7,3.7m0-9.86H38.8a3.7,3.7,0,1,0,0-7.4H28.94a3.7,3.7,0,0,0,0,7.4"
          ></path>
          <path
            className={styles.justStroke}
            style={{ strokeWidth: 1.8 }}
            d="M5.5,28.94a3.7,3.7,0,0,0,7.4,0v-3.7H9.2a3.7,3.7,0,0,0-3.7,3.7m9.86,0V38.8a3.7,3.7,0,0,0,7.4,0V28.94a3.68,3.68,0,0,0-3.68-3.7h0a3.7,3.7,0,0,0-3.7,3.7"
          ></path>
        </symbol>
      </svg>

      <svg className={styles.hideSvg}>
        <symbol id="tick-svg">
          <svg className={styles.fillColor}>
            <path
              fillRule="evenodd"
              d="M12.78 4.62a.75.75 0 0 1 0 1.06l-6.097 6.097a.75.75 0 0 1-1.069-.009L3.211 9.284a.75.75 0 1 1 1.078-1.043l1.873 1.936L11.72 4.62a.75.75 0 0 1 1.06 0"
              clipRule="evenodd"
            />
          </svg>
        </symbol>
      </svg>
    </>
  );
}

export default ContactIcons;
