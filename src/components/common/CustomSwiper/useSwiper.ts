


import { useRef, useCallback } from 'react';
import type { Swiper as SwiperType } from 'swiper';

export const useSwiper = () => {
  const swiperRef = useRef<SwiperType>(null);

  const setSwiperRef = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
  }, []);

  const slideNext = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }, []);

  const slidePrev = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  }, []);

  const slideTo = useCallback((index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  }, []);

  return {
    setSwiperRef,
    slideNext,
    slidePrev,
    slideTo,
    swiper: swiperRef.current
  };
};
