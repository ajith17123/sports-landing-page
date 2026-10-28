import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

/**
 * Custom hook to integrate Lenis smooth scrolling with GSAP ScrollTrigger.
 * Synchronizes Lenis's scroll cycle with GSAP's ticker and ScrollTrigger updates.
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with optimized smooth-scrolling parameters
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
      infinite: false,
    });

    // Provide access on window for anchor or programmatic scrolling
    window.__lenis = lenis;

    // Update GSAP ScrollTrigger on Lenis scroll event
    const handleLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleLenisScroll);

    // Drive Lenis through GSAP ticker for synchronous render loop
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Turn off GSAP lag smoothing to keep scroll animations perfectly synced
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.off('scroll', handleLenisScroll);
      lenis.destroy();
      if (window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, []);
}

export default useSmoothScroll;
