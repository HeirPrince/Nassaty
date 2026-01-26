import { forwardRef } from 'react';
import { classes } from '~/utils/style';
import monogram from '../../assets/monogram.png';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  return (
    <img
      aria-hidden
      className={classes(styles.monogram, className)}
      width="48"
      height="48"
      src={monogram}
      ref={ref}
      css={{ objectFit: 'contain' }}
      {...props}
    />
  );
});
