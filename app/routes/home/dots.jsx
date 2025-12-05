import { useRef, useEffect } from 'react';
import { useTheme } from '~/components/theme-provider';
import { useSpring } from 'framer-motion';
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Points,
    PointsMaterial,
    BufferGeometry,
    Float32BufferAttribute,
    SphereGeometry,
    Vector3,
    CanvasTexture,
} from 'three';
import { throttle } from '~/utils/throttle';
import { cleanRenderer, cleanScene } from '~/utils/three';
import styles from './dots.module.css';

// Create a circular particle texture
const createCircleTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.6)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    return new CanvasTexture(canvas);
};

export const Dots = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();
    const containerRef = useRef(null);
    const mouse = useRef(new Vector3(0, 0, 0));
    const scene = useRef(null);
    const camera = useRef(null);
    const renderer = useRef(null);
    const points = useRef(null);
    const velocities = useRef([]);
    const originalPositions = useRef([]);
    const blastProgress = useRef(0);
    const springConfig = { stiffness: 30, damping: 20, mass: 2 };
    const rotationX = useSpring(0, springConfig);
    const rotationY = useSpring(0, springConfig);

    useEffect(() => {
        const { innerWidth, innerHeight } = window;

        renderer.current = new WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
        });
        renderer.current.setSize(innerWidth, innerHeight);
        renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        camera.current = new PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
        camera.current.position.z = 30;

        scene.current = new Scene();

        // Create sphere geometry
        const sphereGeometry = new SphereGeometry(32, 32, 32);
        const positions = sphereGeometry.attributes.position.array;

        // Filter out dots near poles
        const filteredPositions = [];
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];

            // Skip dots at poles
            const normalizedY = Math.abs(y / 32);
            if (normalizedY < 0.95) {
                filteredPositions.push(x, y, z);
            }
        }

        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new Float32BufferAttribute(filteredPositions.slice(), 3));

        originalPositions.current = filteredPositions.slice();

        // Create velocities
        velocities.current = [];
        for (let i = 0; i < filteredPositions.length; i += 3) {
            const x = filteredPositions[i];
            const y = filteredPositions[i + 1];
            const z = filteredPositions[i + 2];

            const length = Math.sqrt(x * x + y * y + z * z);
            velocities.current.push({
                x: (x / length) * (Math.random() * 0.5 + 0.5),
                y: (y / length) * (Math.random() * 0.5 + 0.5),
                z: (z / length) * (Math.random() * 0.5 + 0.5),
            });
        }

        const circleTexture = createCircleTexture();

        const material = new PointsMaterial({
            size: 0.4,
            color: theme === 'light' ? 0x000000 : 0xED9B40,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
            blending: 2,
            map: circleTexture,
            alphaTest: 0.01,
            depthWrite: false,
        });

        points.current = new Points(geometry, material);
        points.current.rotation.z = Math.PI / 4;
        points.current.position.x = 24;
        points.current.position.y = 20;
        scene.current.add(points.current);

        const onMouseMove = throttle((event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            rotationX.set(y * 0.5);
            rotationY.set(x * 0.5);
        }, 100);

        window.addEventListener('mousemove', onMouseMove);

        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            if (points.current) {
                blastProgress.current += 0.008;

                const blastCycle = Math.sin(blastProgress.current) * 0.5 + 0.5;
                const explosionStrength = blastCycle * 15;

                const positions = points.current.geometry.attributes.position.array;

                for (let i = 0; i < positions.length; i += 3) {
                    const idx = i / 3;
                    const vel = velocities.current[idx];

                    positions[i] = originalPositions.current[i] + vel.x * explosionStrength;
                    positions[i + 1] = originalPositions.current[i + 1] + vel.y * explosionStrength;
                    positions[i + 2] = originalPositions.current[i + 2] + vel.z * explosionStrength;
                }

                points.current.geometry.attributes.position.needsUpdate = true;

                points.current.rotation.y += 0.0005;
                points.current.rotation.x = rotationX.get();
                points.current.rotation.y += rotationY.get() * 0.05;

                points.current.material.opacity = 0.6 + blastCycle * 0.3;
            }

            renderer.current.render(scene.current, camera.current);
        };

        animate();

        const handleResize = () => {
            const { innerWidth, innerHeight } = window;
            renderer.current.setSize(innerWidth, innerHeight);
            camera.current.aspect = innerWidth / innerHeight;
            camera.current.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
            cleanScene(scene.current);
            cleanRenderer(renderer.current);
        };
    }, [theme, rotationX, rotationY]);

    return (
        <div ref={containerRef} className={styles.dots} aria-hidden>
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
};
