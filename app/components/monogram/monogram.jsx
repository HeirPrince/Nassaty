import { forwardRef } from 'react';
import { classes } from '~/utils/style';
import logoDark from '~/assets/logo_dark.svg';
import logoLight from '~/assets/logo_light.svg';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  return (
    <div
      aria-hidden
      className={classes(styles.monogram, className)}
      ref={ref}
      {...props}
    >
      <img
        src={logoLight}
        alt=""
        className={styles.light}
        width="48"
        height="48"
        style={{ objectFit: 'contain' }}
      />
      <img
        src={logoDark}
        alt=""
        className={styles.dark}
        width="48"
        height="48"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
});
