import { useEffect, useRef } from 'react';

/** Agrega data-visible="true" cuando el elemento entra en pantalla (revelado CSS). */
export const useReveal = (threshold = 0.2) => {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (!('IntersectionObserver' in window)) {
      node.dataset.visible = 'true';
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.visible = 'true';
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
};
