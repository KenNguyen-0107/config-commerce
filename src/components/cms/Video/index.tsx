"use client";

import { Play } from "lucide-react";
import { useRef, useState } from "react";

interface VideoBlockProps {
  title?: string;
  description?: string;
  videoUrl?: string;
  posterUrl?: string;
}

export default function VideoBlock({
  title = "THIS IS JACKSONS FENCING",
  description = "We have developed this short film to showcase our unique processes which go into crafting our timber fencing, garden gates and accessories. It is these processes that allow us to offer our market leading 25 year guarantee and helped to establish our reputation for quality, service and our ability to make every garden beautiful.",
  videoUrl = "https://www.jacksons-fencing.co.uk/-/media/jacksons/product-master/brand-video/standard--jacksons-fencing--timber-process-video-master-compressed.mp4", // Replace with actual video URL
  posterUrl = "https://www.jacksons-fencing.co.uk/-/media/jacksons/product-master/brand-video/we-are-jacksons-fencing.jpg",
}: VideoBlockProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-muted-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full container py-20 py-auto ">
        {/* Text Content - Exactly 50% width on desktop */}
        <div
          className="flex flex-col justify-center px-6 py-12 lg:p-16"
          style={{ backgroundColor: "var(--color-blue)" }}
        >
          <h2 className="text-[32px] lg:text-[40px] leading-[1.2] tracking-wide font-bold mb-6 text-white">
            {title}
          </h2>
          <p className="text-[18px] leading-[1.6] text-white font-lora">
            {description}
          </p>
        </div>

        {/* Video Section - Exactly 50% width on desktop */}
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <video
            ref={videoRef}
            poster={posterUrl}
            className="w-full h-full object-cover"
            onEnded={() => setIsPlaying(false)}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>

          {/* Play Button Overlay - Exact size and styling from Figma */}
          <button
            onClick={handlePlayClick}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            w-[96px] h-[96px] rounded-full bg-white bg-opacity-[0.95] 
            flex items-center justify-center transition-opacity duration-300 
            ${isPlaying ? "opacity-0" : "opacity-100"} hover:bg-opacity-100`}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            <Play
              className="w-10 h-10 text-blue ml-1.5"
              fill="var(--color-blue)"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
