"use client";

import { useState, useRef } from "react";
import { Play } from "lucide-react";
import Image from "next/image";

interface VideoPlayerProps {
  thumbnail: string;
  videoUrl: string;
}

export function VideoPlayer({ thumbnail, videoUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <Image
        fill
        src={thumbnail}
        alt="Video thumbnail"
        className="w-full h-full object-cover"
      />
      <button
        onClick={handlePlayClick}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
        aria-label="Play video"
      >
        <Play className="w-8 h-8 text-blue ml-1" />
      </button>
      <video
        ref={videoRef}
        className={`${isPlaying ? "z-10" : "-z-10"} w-full h-full absolute`}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
