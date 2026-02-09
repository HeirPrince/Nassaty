import { useCallback, useEffect, useRef, useState } from 'react';

// Use undefined for SSR to prevent hydration mismatches
const defaultDimensions = typeof window !== 'undefined' 
  ? { width: window.innerWidth, height: window.innerHeight }
  : { width: 1280, height: 800 };

export function useWindowSize() {
  const dimensions = useRef({ w: 1280, h: 800 });
  const [windowSize, setWindowSize] = useState(defaultDimensions);

  const createRuler = useCallback(() => {
    if (typeof document === 'undefined') return;
    
    let ruler = document.createElement('div');

    ruler.style.position = 'fixed';
    ruler.style.height = '100vh';
    ruler.style.width = 0;
    ruler.style.top = 0;

    document.documentElement.appendChild(ruler);

    // Set cache conscientious of device orientation
    dimensions.current.w = window.innerWidth;
    dimensions.current.h = ruler.offsetHeight;

    // Clean up after ourselves
    document.documentElement.removeChild(ruler);
    ruler = null;
  }, []);

  // Get the actual height on iOS Safari
  const getHeight = useCallback(() => {
    if (typeof window === 'undefined') return defaultDimensions.height;
    
    const isIOS = navigator?.userAgent.match(/iphone|ipod|ipad/i);

    if (isIOS) {
      createRuler();
      return dimensions.current.h;
    }

    return window.innerHeight;
  }, [createRuler]);

  const getSize = useCallback(() => {
    if (typeof window === 'undefined') return defaultDimensions;
    
    return {
      width: window.innerWidth,
      height: getHeight(),
    };
  }, [getHeight]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getSize]);

  return windowSize;
}
