import React from 'react';
import styles from './Footer.module.scss';
import GitHubIcon from '@mui/icons-material/GitHub';
import rsschoolIcon from '../../assets/img/svg/rs_school-icon.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        className={styles.footerGithub}
        href="https://github.com/fgriff"
        target="_blank"
      >
        <GitHubIcon sx={{ fontSize: 30 }} />
      </a>
      <time
        className={styles.footerYear}
        dateTime="2023"
      >
        2023
      </time>
      <a
        href="https://rs.school/js/"
        target="_blank"
      >
        <img
          className={styles.footerLogo}
          src={rsschoolIcon}
          alt="RSSchool icon"
        />
      </a>
    </footer>
  );
};

export default Footer;
