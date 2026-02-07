import { useSpring, useTransform, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import shield from '~/assets/shield.svg';
import { media } from '~/utils/style';
import styles from './shield.module.css';

export const Shield = () => {
    const ref = useRef(null);
    const x = useSpring(0, { stiffness: 30, damping: 20 });
    const y = useSpring(0, { stiffness: 30, damping: 20 });

    // Transform mouse position to rotation values
    const rotateX = useTransform(y, [-1, 1], [15, -15]); // Tilt up/down
    const rotateY = useTransform(x, [-1, 1], [-15, 15]); // Tilt left/right

    useEffect(() => {
        const handleMouseMove = (event) => {
            const { innerWidth, innerHeight } = window;
            const clientX = event.clientX;
            const clientY = event.clientY;

            // Normalize coordinates to -1 to 1
            const normalizedX = (clientX / innerWidth) * 2 - 1;
            const normalizedY = (clientY / innerHeight) * 2 - 1;

            x.set(normalizedX);
            y.set(normalizedY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    return (
        <div className={styles.shieldWrapper}>
            <motion.div
                ref={ref}
                className={styles.shield}
                style={{
                    rotateX,
                    rotateY,
                }}
            >
                <img src={shield} alt="" />
            </motion.div>
        </div>
    );
};
