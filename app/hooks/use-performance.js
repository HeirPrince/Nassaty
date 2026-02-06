/**
 * Performance Monitoring Hook
 * 
 * Monitors and reports Web Vitals metrics for performance tracking
 */

import { useEffect } from 'react';

export function usePerformanceMonitoring() {
    useEffect(() => {
        if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
            return;
        }

        // Core Web Vitals monitoring
        const reportWebVitals = (metric) => {
            // Log to console in development
            console.log(metric);

            // In production, you could send to analytics
            // Example: sendToAnalytics(metric);
        };

        // Largest Contentful Paint (LCP)
        const observeLCP = () => {
            try {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];

                    reportWebVitals({
                        name: 'LCP',
                        value: lastEntry.renderTime || lastEntry.loadTime,
                        rating: lastEntry.renderTime < 2500 ? 'good' : lastEntry.renderTime < 4000 ? 'needs-improvement' : 'poor',
                    });
                });

                observer.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                // LCP not supported
            }
        };

        // First Input Delay (FID)
        const observeFID = () => {
            try {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        const delay = entry.processingStart - entry.startTime;

                        reportWebVitals({
                            name: 'FID',
                            value: delay,
                            rating: delay < 100 ? 'good' : delay < 300 ? 'needs-improvement' : 'poor',
                        });
                    });
                });

                observer.observe({ entryTypes: ['first-input'] });
            } catch (e) {
                // FID not supported
            }
        };

        // Cumulative Layout Shift (CLS)
        const observeCLS = () => {
            try {
                let clsValue = 0;
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    }

                    reportWebVitals({
                        name: 'CLS',
                        value: clsValue,
                        rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
                    });
                });

                observer.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                // CLS not supported
            }
        };

        // Time to First Byte (TTFB)
        const measureTTFB = () => {
            try {
                const navigationTiming = performance.getEntriesByType('navigation')[0];
                if (navigationTiming) {
                    const ttfb = navigationTiming.responseStart - navigationTiming.requestStart;

                    reportWebVitals({
                        name: 'TTFB',
                        value: ttfb,
                        rating: ttfb < 800 ? 'good' : ttfb < 1800 ? 'needs-improvement' : 'poor',
                    });
                }
            } catch (e) {
                // TTFB measurement failed
            }
        };

        // First Contentful Paint (FCP)
        const observeFCP = () => {
            try {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        reportWebVitals({
                            name: 'FCP',
                            value: entry.startTime,
                            rating: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor',
                        });
                    });
                });

                observer.observe({ entryTypes: ['paint'] });
            } catch (e) {
                // FCP not supported
            }
        };

        // Initialize all observers
        observeLCP();
        observeFID();
        observeCLS();
        observeFCP();
        measureTTFB();

        // Cleanup
        return () => {
            // Performance observers are automatically cleaned up
        };
    }, []);
}

/**
 * Resource Timing Monitor
 * Tracks loading performance of assets
 */
export function useResourceTiming() {
    useEffect(() => {
        if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
            return;
        }

        const analyzeResources = () => {
            const resources = performance.getEntriesByType('resource');

            const slowResources = resources
                .filter(resource => resource.duration > 1000)
                .map(resource => ({
                    name: resource.name,
                    duration: Math.round(resource.duration),
                    size: resource.transferSize,
                    type: resource.initiatorType,
                }));

            if (slowResources.length > 0) {
                console.warn('Slow loading resources detected:', slowResources);
            }
        };

        // Analyze after page load
        if (document.readyState === 'complete') {
            analyzeResources();
        } else {
            window.addEventListener('load', analyzeResources);
            return () => window.removeEventListener('load', analyzeResources);
        }
    }, []);
}
