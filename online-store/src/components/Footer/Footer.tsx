import React from 'react';
import styles from './Footer.scss';
import GitHubIcon from '@mui/icons-material/GitHub';
import rsschoolIcon from '../../assets/img/svg/rs_school-icon.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__githubWrapper}>
        <a
          className={styles.footer__github}
          href="https://github.com/fgriff"
          target="_blank"
        >
          <GitHubIcon sx={{ fontSize: 30 }} />
        </a>
        <a
          className={styles.footer__github}
          href="https://github.com/IvanBusygin"
          target="_blank"
        >
          <GitHubIcon sx={{ fontSize: 30 }} />
        </a>
      </div>
      <time
        className={styles.footer__year}
        dateTime="2023"
      >
        2023
      </time>
      <a
        href="https://rs.school/js/"
        target="_blank"
      >
        <img
          className={styles.footer__logo}
          src={rsschoolIcon}
          alt="RSSchool icon"
        />
      </a>
    </footer>
  );
};

export default Footer;
