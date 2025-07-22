"use client"

import { useState, useEffect, useRef } from "react"
import NextImage, { ImageProps } from "next/image"
import { NoImageSrc } from "../utils"

interface LazyImageProps extends ImageProps {
    isHidden?: boolean;
}

export default function LazyImage(
    { src, alt, loading, width, height, isHidden, ...props }: LazyImageProps) {
    const [isVisible, setIsVisible] = useState(loading === 'eager' ? true : false)
    const ref = useRef<HTMLImageElement>(null)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { rootMargin: "0px" }, // Load images when they're within 200px of viewport
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [])

    return (
        <NextImage
            src={isVisible && isHidden != true ? src : NoImageSrc}
            alt={alt}
            width={width}
            height={height}
            ref={ref}
            {...props}
        />
    )
}

