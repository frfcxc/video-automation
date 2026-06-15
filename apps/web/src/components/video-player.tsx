"use client";

import { useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  label?: string;
  subtitleSrc?: string;
}

export function VideoPlayer({ src, label, subtitleSrc }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-950/20 text-sm text-rose-300">
        Could not load video: {src}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {label ? (
        <p className="text-sm font-medium text-slate-300">{label}</p>
      ) : null}
      <video
        ref={videoRef}
        src={src}
        controls
        preload="metadata"
        className="w-full rounded-2xl border border-white/10 bg-black"
        onError={() => setError(true)}
      >
        {subtitleSrc ? (
          <track
            kind="subtitles"
            src={subtitleSrc}
            srcLang="en"
            label="English"
            default
          />
        ) : null}
      </video>
    </div>
  );
}
