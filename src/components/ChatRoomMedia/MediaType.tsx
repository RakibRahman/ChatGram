import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ImagePreview } from '../FilePreview/ImagePreview';
import URLPreview from '../FilePreview/URLPreview';
import VideoPreview from '../FilePreview/VideoPreview';

interface MediaTypesProps {
    type: 'photos' | 'files' | 'videos' | 'links';
    link: string;
}

export const MediaType: React.FC<MediaTypesProps> = ({ type, link }) => {
    const isTab = useMediaQuery('(max-width: 768px)');

    if (type === 'photos') {
        return <ImagePreview src={link!} width={isTab ? '100%' : '200px'} height="200px" />;
    }

    if (type === 'videos') {
        return <VideoPreview videoLink={link!} showControl autoPlay={false} height="200px" />;
    }

    if (type === 'links') {
        return <URLPreview url={link} />;
    }

    return <></>;
};
