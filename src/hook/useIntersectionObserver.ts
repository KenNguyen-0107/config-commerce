import { useEffect, useRef, useState } from 'react';
// import type { IntersectionObserverOptions, IntersectionObserverHookReturn } from '@/types/intersection-observer';

export interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
  freezeOnceVisible?: boolean;
}

export interface IntersectionObserverHookReturn {
  elementRef: React.RefObject<Element | null>;
  isIntersecting: boolean;
  hasBeenVisible: boolean;
}

export interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
  onError?: () => void;
}

export interface LazyIframeProps {
  src: string;
  title: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  allowFullScreen?: boolean;
  allow?: string;
  sandbox?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
}

export const useIntersectionObserver = ({
  threshold = 0,
  rootMargin = '0px',
  root = null,
  freezeOnceVisible = true
}: IntersectionObserverOptions = {}): IntersectionObserverHookReturn => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [hasBeenVisible, setHasBeenVisible] = useState<boolean>(false);
  const elementRef = useRef<Element | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (hasBeenVisible && freezeOnceVisible) return;

    const observerCallback: IntersectionObserverCallback = ([entry]) => {
      const isElementIntersecting = entry.isIntersecting;
      setIsIntersecting(isElementIntersecting);

      if (isElementIntersecting) {
        setHasBeenVisible(true);
        
        if (freezeOnceVisible) {
          observer.disconnect();
        }
      }
    };

    const observerOptions: IntersectionObserverInit = {
      threshold,
      rootMargin,
      root
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, root, freezeOnceVisible, hasBeenVisible]);

  return { elementRef, isIntersecting, hasBeenVisible };
};