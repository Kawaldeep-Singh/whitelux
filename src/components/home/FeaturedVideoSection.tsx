'use client';

import React, { useRef, useState } from 'react';
import { Play, Volume2, Sparkles, Maximize2 } from 'lucide-react';
import { FeaturedVideo } from '@/types';

interface FeaturedVideoSectionProps {
  video?: FeaturedVideo;
}

export default function FeaturedVideoSection({ video }: FeaturedVideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPortrait, setIsPortrait] = useState<boolean>(true); // default true for vertical 9:16 portrait video
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!video || !video.videoUrl || video.isActive === false) {
    return null;
  }

  const handleStartPlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // explicitly enable sound
      videoRef.current.volume = 1.0;
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().then(() => setIsPlaying(true));
          }
        });
    }
  };

  const handleMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (v.videoWidth && v.videoHeight) {
      setIsPortrait(v.videoHeight > v.videoWidth);
    }
  };

  return (
    <section className="py-14 md:py-20 bg-[#0D0D0D] text-[#F4ECD8] relative overflow-hidden border-t border-[#1F1C16]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C8A24A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18150F] border border-[#C8A24A]/30 text-[#C8A24A] text-[11px] font-mono tracking-widest uppercase mb-3 shadow-sm">
            <Sparkles size={12} className="text-[#C8A24A]" />
            <span>Cinematic Showcase</span>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#F4ECD8] tracking-tight leading-tight mb-3">
            {video.title || "An Insider's Perspective on Luxury Real Estate"}
          </h2>

          {video.subtitle && (
            <p className="text-xs md:text-sm text-[#9A8F7E] font-sans leading-relaxed">
              {video.subtitle}
            </p>
          )}
        </div>

        {/* Video Player Container - 10% reduced to fit standard screen viewports comfortably */}
        <div
          className={`relative mx-auto rounded-2xl md:rounded-3xl overflow-hidden border border-[#2A261D] bg-[#0E0C09] shadow-2xl shadow-black group transition-all duration-300 ${
            isPortrait
              ? 'max-w-[325px] sm:max-w-[375px] aspect-[9/16] max-h-[68vh]'
              : 'max-w-4xl aspect-video max-h-[68vh]'
          }`}
        >
          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.posterUrl || undefined}
            controls={isPlaying}
            playsInline
            preload="metadata"
            onLoadedMetadata={handleMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-contain bg-black"
          />

          {/* Luxury Play Overlay (Shows before playing) */}
          {!isPlaying && (
            <div
              onClick={handleStartPlay}
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-black/50 p-6 text-center"
            >
              {/* Pulsing ring around button */}
              <div className="relative flex items-center justify-center mb-3">
                <div className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#C8A24A]/25 animate-ping pointer-events-none" />
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-[#C8A24A] to-[#E8C872] text-[#0D0D0D] flex items-center justify-center shadow-2xl shadow-[#C8A24A]/40 group-hover:scale-110 transition-transform duration-300">
                  <Play size={24} className="ml-1 text-[#0D0D0D] fill-current" />
                </div>
              </div>

              {/* Action label with sound indicator */}
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/70 border border-[#C8A24A]/40 text-[#F4ECD8] text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md shadow-lg group-hover:border-[#C8A24A] transition-colors">
                <Volume2 size={13} className="text-[#C8A24A]" />
                <span>Play Film With Sound</span>
              </div>
            </div>
          )}

          {/* Sound Active indicator (Shown while playing) */}
          {isPlaying && (
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-[#C8A24A]/30 px-3 py-1 rounded-full text-[11px] text-[#C8A24A] flex items-center gap-1.5 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
              <Volume2 size={13} />
              <span>Sound Active</span>
            </div>
          )}
        </div>

        {/* Caption strip */}
        <div className={`mt-3 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7E7B73] px-2 gap-2 mx-auto ${
          isPortrait ? 'max-w-[375px]' : 'max-w-4xl'
        }`}>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A24A]" />
            Official White Luxe Presentation
          </span>
          <span className="font-mono text-[10px] text-[#555]">
            Curated by Rohit Raj Maingi · Gurgaon
          </span>
        </div>
      </div>
    </section>
  );
}
