"use client";

import React from "react";

interface VideoPlayerProps {
    url: string;
    title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title = "Video" }) => {
    return (
        <div className="rounded-3xl border-2 lg:border-[3px] border-red-500 overflow-hidden shadow-xl w-full max-w-3xl aspect-video">
            <iframe
                className="w-full h-full"
                src={url}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default VideoPlayer;
