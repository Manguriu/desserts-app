"use client";

import React, { useEffect, useRef } from "react";

interface TikTokEmbedProps {
  url: string;
  className?: string;
}

export default function TikTokEmbed({
  url,
  className = "",
}: TikTokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Load the embed script once
  useEffect(() => {
    if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Re-render embeds on URL change
  useEffect(() => {
    // 1) Generic cast on querySelectorAll → HTMLElement[]
    const blocks = Array.from(
      document.querySelectorAll<HTMLElement>("blockquote.tiktok-embed")
    );
    if (window.tiktokEmbed?.lib && blocks.length) {
      window.tiktokEmbed.lib.render(blocks);
    } else if (window.tiktok) {
      window.tiktok.load();
    }
  }, [url]);

  // Extract video ID
  const getVideoId = (u: string) => u.match(/video\/(\d+)/)?.[1] ?? "";

  const embedHtml = url.includes("<blockquote")
    ? url
    : `<blockquote
         class="tiktok-embed"
         cite="${url}"
         data-video-id="${getVideoId(url)}"
         style="max-width: 605px; min-width: 325px;"
       ><section></section></blockquote>`;

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: embedHtml }}
    />
  );
}

// Updated global declarations
declare global {
  interface Window {
    tiktokEmbed?: { lib: { render: (elems: HTMLElement[]) => void } };
    tiktok?: { load: () => void };
  }
}
