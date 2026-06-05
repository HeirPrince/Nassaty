import React, { useRef, useEffect, forwardRef } from 'react';
import styles from './scroll-pinned-section.module.css';

// Vanilla JS implementation (no heavy frameworks like GSAP in this version).
// Implements a clean horizontal scroll translation tied to vertical sticky scroll.

export const ScrollPinnedSection = forwardRef(({ children, className = '' }, ref) => {
  const internalRef = useRef(null);
  const containerRef = ref || internalRef;
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const rafRef = useRef(null);

  const panels = React.Children.toArray(children);
  const panelsCount = panels.length;
  
  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return;
    if (!containerRef.current || !viewportRef.current || !trackRef.current) return;
    
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const container = containerRef.current;
    const track = trackRef.current;
    const progressFill = progressRef.current;
    
    // We want a long scroll area.
    // 100vh for the initial appearance, plus N * 100vh for scrolling through.
    // Actually, to feel "one project at a time", each project needs significant scroll space.
    // Let's say 150vh per project transition.
    const SCROLL_PER_PANEL = 100; // vh
    const totalHeightVh = 100 + (panelsCount - 1) * SCROLL_PER_PANEL;
    container.style.height = `${totalHeightVh}vh`;
    
    track.style.width = `${panelsCount * 100}%`;

    let currentScroll = 0;
    
    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - viewportHeight;
      
      // Calculate how far we are into the container
      // If rect.top <= 0, we are pinning.
      // Progress 0 when rect.top = 0.
      // Progress 1 when rect.top = -totalScrollableDistance.
      
      let rawProgress = -rect.top / totalScrollableDistance;
      rawProgress = Math.max(0, Math.min(rawProgress, 1));
      
      currentScroll = rawProgress;
      
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      
      rafRef.current = requestAnimationFrame(() => {
        // Horizontal Translation
        // We move from 0 to -(N-1)*100vw
        const maxTranslateX = (panelsCount - 1) * 100; // in vw
        const currentTranslateX = currentScroll * maxTranslateX * -1;
        
        track.style.transform = `translate3d(${currentTranslateX}vw, 0, 0)`;
        
        // Progress Bar
        if (progressFill) {
            progressFill.style.width = `${currentScroll * 100}%`;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    
    // Initial measure
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      
      // Cleanup styles
      container.style.height = '';
      track.style.width = '';
      track.style.transform = '';
    };
  }, [panelsCount]);

  return (
    <section ref={containerRef} className={`${styles.container} ${className}`}>
      <div className={styles.stickyViewport} ref={viewportRef}>
        <div className={styles.track} ref={trackRef}>
          {panels.map((child, index) => (
            <div key={index} className={styles.panel}>
              {child}
            </div>
          ))}
        </div>
        {/* Progress Indicator */}
        <div className={styles.progressBar}>
           <div className={styles.progressFill} ref={progressRef} />
        </div>
      </div>
    </section>
  );
});

ScrollPinnedSection.displayName = 'ScrollPinnedSection';
