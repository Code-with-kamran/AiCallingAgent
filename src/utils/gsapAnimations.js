import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Hero text
export const animateHero = (selector) => {
  gsap.from(selector, {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
  });
};

// Stagger cards
export const animateCards = (selector) => {
  gsap.from(selector, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: selector,
      start: 'top 90%',
    },
  });
};