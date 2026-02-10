import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { ProjectSummary } from './project-summary';
import { useTheme } from '~/components/theme-provider';
import { useHydrated } from '~/hooks/useHydrated';
import styles from './projects.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Assets
import pro2Texture from '~/assets/pro2.jpeg';
import p1Texture from '~/assets/P1.svg';
import p1LightTexture from '~/assets/P1_light.svg';
import civoInvoiceTexture from '~/assets/civo_invoice.svg';
import sprTexture from '~/assets/pr1_drooms.png';
import sprTexturePlaceholder from '~/assets/pr1_drooms-placeholder.png';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export function Projects() {
    const containerRef = useRef(null);
    const projectRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const { theme } = useTheme();
    const isHydrated = useHydrated();

    const isTransitioning = useRef(false);
    const scrollTriggerInstance = useRef(null);
    const lastScrollTime = useRef(0);
    const accumulatedDelta = useRef(0);

    // Ref to track current index for listeners without re-binding
    const activeIndexRef = useRef(0);
    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    const projects = useMemo(() => [
        {
            id: "project-1",
            index: 1,
            title: "QBot",
            description: "Automate and enhance your customer interactions with our intelligent AI chatbot, designed to respond, support, and grow your business effortlessly.",
            buttonText: "View More",
            buttonLink: "/projects/slice",
            color: "rgba(0, 229, 255, 0.05)",
            model: {
                type: 'image',
                alt: 'QBot AI chatbot interface',
                textures: [
                    {
                        srcSet: `${isHydrated && theme === 'light' ? p1LightTexture : p1Texture} 800w`,
                        placeholder: isHydrated && theme === 'light' ? p1LightTexture : p1Texture,
                    },
                ],
            }
        },
        {
            id: "project-2",
            index: 2,
            alternate: true,
            title: "Digital Commerce Platform",
            description: `A complete website and mobile ordering system that helps businesses showcase their brand, accept orders, and track them in real time — all for a simple monthly fee.\n\nFrom menus and promotions to ordering and delivery tracking, everything your customers need is in one place.`,
            buttonText: "View More",
            buttonLink: "/projects/smart-sparrow",
            color: "rgba(237, 155, 64, 0.05)",
            model: {
                type: 'laptop-flat',
                alt: 'Nassaty ordering system on desktop and mobile',
                textures: [
                    {
                        srcSet: `${sprTexture} 800w`,
                        placeholder: sprTexturePlaceholder,
                    },
                    {
                        srcSet: `${pro2Texture} 375w`,
                        placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
                    },
                ],
            }
        },
        {
            id: "project-3",
            index: 3,
            title: "CIVO Construction",
            description: `A centralized platform that helps construction businesses manage proformas, purchase orders, delivery notes, and invoices — all in one secure, easy-to-use system.\n\nReduce paperwork. Improve accuracy. Get paid faster.`,
            buttonText: "View More",
            buttonLink: "/projects/civo",
            color: "rgba(100, 100, 255, 0.05)",
            model: {
                type: 'image',
                alt: 'Civo invoice management dashboard',
                textures: [
                    {
                        srcSet: `${civoInvoiceTexture} 800w`,
                        placeholder: civoInvoiceTexture,
                    },
                ],
            }
        }
    ], [isHydrated, theme]);

    const transitionToProject = useCallback((newIndex, direction) => {
        if (isTransitioning.current || newIndex === activeIndexRef.current) return;
        if (newIndex < 0 || newIndex >= projects.length) return;

        isTransitioning.current = true;
        lastScrollTime.current = Date.now();

        const outgoing = projectRefs.current[activeIndexRef.current];
        const incoming = projectRefs.current[newIndex];

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const duration = prefersReducedMotion ? 0 : 0.8;

        const tl = gsap.timeline({
            onComplete: () => {
                isTransitioning.current = false;
                accumulatedDelta.current = 0;
            }
        });

        // Sync scroll position with project index
        // This ensures that reaching the last project also reaches the end of the ScrollTrigger
        if (scrollTriggerInstance.current) {
            const st = scrollTriggerInstance.current;
            const scrollRange = st.end - st.start;
            const targetScroll = st.start + (scrollRange * (newIndex / (projects.length - 1)));

            gsap.to(window, {
                scrollTo: targetScroll,
                duration: duration,
                ease: "power3.inOut"
            });
        }

        // Handle background color crossfade
        gsap.to(containerRef.current, {
            backgroundColor: projects[newIndex].color,
            duration: duration,
            ease: "power2.inOut"
        });

        // Prepare incoming project
        gsap.set(incoming, {
            autoAlpha: 1,
            zIndex: 10,
            display: 'flex'
        });
        gsap.set(outgoing, { zIndex: 5 });

        // Outgoing animation
        tl.to(outgoing, {
            y: direction > 0 ? -60 : 60,
            opacity: 0,
            duration: duration * 0.75,
            ease: "power2.in",
            onComplete: () => {
                gsap.set(outgoing, { autoAlpha: 0, display: 'none' });
            }
        }, 0);

        // Incoming animation
        tl.fromTo(incoming,
            {
                y: direction > 0 ? 60 : -60,
                opacity: 0,
                scale: 0.95,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: duration,
                ease: "power3.out"
            },
            prefersReducedMotion ? 0 : "-=0.4"
        );

        setActiveIndex(newIndex);
    }, [projects]);

    const handleWheel = useCallback((event) => {
        if (!scrollTriggerInstance.current?.isActive) return;

        const now = Date.now();
        const timeSinceLastScroll = now - lastScrollTime.current;

        // Strict lock window for deliberate transitions
        if (isTransitioning.current || timeSinceLastScroll < 600) {
            if (Math.abs(event.deltaY) > 5) event.preventDefault();
            return;
        }

        // Capture and accumulate delta
        accumulatedDelta.current += event.deltaY;

        // Threshold sensitivity adjustment
        const threshold = 40;

        if (Math.abs(accumulatedDelta.current) >= threshold) {
            const direction = accumulatedDelta.current > 0 ? 1 : -1;
            const newIndex = activeIndexRef.current + direction;

            if (newIndex >= 0 && newIndex < projects.length) {
                event.preventDefault();
                transitionToProject(newIndex, direction);
            } else {
                // Boundary case: let it pass through to allow unpinning
                accumulatedDelta.current = 0;
            }
        } else {
            // Prevent small scrolls from moving the page while pinned
            event.preventDefault();
        }
    }, [projects.length, transitionToProject]);

    const handleKeyDown = useCallback((event) => {
        if (!scrollTriggerInstance.current?.isActive || isTransitioning.current) return;

        if (event.key === 'ArrowDown' || event.key === 'PageDown') {
            event.preventDefault();
            if (activeIndexRef.current < projects.length - 1) {
                transitionToProject(activeIndexRef.current + 1, 1);
            }
        } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
            event.preventDefault();
            if (activeIndexRef.current > 0) {
                transitionToProject(activeIndexRef.current - 1, -1);
            }
        }
    }, [projects.length, transitionToProject]);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            scrollTriggerInstance.current = ScrollTrigger.create({
                trigger: containerRef.current,
                pin: true,
                start: "top top",
                end: `+=${window.innerHeight * 1.5}`, // Reduced distance for tighter transitions
                scrub: false,
                onEnter: () => {
                    if (activeIndexRef.current === 0) {
                        gsap.set(projectRefs.current[0], { autoAlpha: 1, display: 'flex' });
                    }
                }
            });
        }, containerRef);

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            ctx.revert();
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleWheel, handleKeyDown]);

    // Initial state setup
    useEffect(() => {
        projectRefs.current.forEach((project, i) => {
            if (project) {
                gsap.set(project, {
                    autoAlpha: i === 0 ? 1 : 0,
                    display: i === 0 ? 'flex' : 'none',
                    y: 0,
                    scale: 1
                });
            }
        });
        if (containerRef.current) {
            gsap.set(containerRef.current, { backgroundColor: projects[0].color });
        }
    }, [projects]);

    return (
        <section ref={containerRef} id="projects" className={styles.projects}>
            <div className={styles.projectsWrapper}>
                {projects.map((project, i) => (
                    <article
                        key={project.id}
                        ref={el => projectRefs.current[i] = el}
                        className={styles.projectItem}
                        aria-hidden={i !== activeIndex}
                    >
                        <div className={styles.centeredContent}>
                            <ProjectSummary
                                {...project}
                                visible={i === activeIndex}
                                index={project.index}
                            />
                        </div>
                    </article>
                ))}

                <nav className={styles.progressIndicator} aria-label="Project progression">
                    {projects.map((_, i) => (
                        <button
                            key={i}
                            className={styles.progressDot}
                            data-active={i === activeIndex}
                            onClick={() => transitionToProject(i, i > activeIndex ? 1 : -1)}
                            aria-label={`Go to project ${i + 1}`}
                            aria-current={i === activeIndex ? 'step' : undefined}
                        />
                    ))}
                </nav>
            </div>
        </section>
    );
}
