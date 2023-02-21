import React from 'react';

type VideoPlayerProps = {
    file?: File | null;
    videoLink: string;
    height?: string;
    width?: string;
    showControl?: boolean;
    isLoop?: boolean;
    autoPlay?: boolean;
    muted?: boolean;
    videoRef?: any;
};

const VideoPreview: React.FC<VideoPlayerProps> = ({
    videoLink,
    showControl = false,
    isLoop = true,
    autoPlay = true,
    muted = true,
    width = '100%',
    height = 'auto',
}) => {
    return (
        <>
            <video
                width={width}
                height={height}
                playsInline
                controls={showControl ? true : false}
                autoPlay={autoPlay ? true : false}
                muted={muted ? true : false}
                className="videoPlayer"
                loop={isLoop ? true : false}
            >
                <source src={videoLink} type="video/mp4" />
                <source src={videoLink} type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </>
    );
};

export default VideoPreview;
