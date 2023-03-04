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
    isLoop = false,
    autoPlay = true,
    muted = true,
    width = '100%',
    height = 'auto',
}) => {
    return (
        <>
            <video
                preload="none"
                // poster='https://gettravel.com/wp-content/uploads/2018/04/Video-Placeholder.jpg'
                style={{
                    height: height,
                    width: width,
                }}
                playsInline
                controls={showControl ? true : false}
                autoPlay={autoPlay ? true : false}
                muted={muted ? true : false}
                className="videoPlayer"
                loop={isLoop ? true : false}
            >
                <source src={videoLink + '#t=0.5'} type="video/mp4" />
                <source src={videoLink + '#t=0.5'} type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </>
    );
};

export default VideoPreview;
