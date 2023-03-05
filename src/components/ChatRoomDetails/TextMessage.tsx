import { validURL } from '../../utilities/validURL';
import URLPreview from '../FilePreview/URLPreview';

export const TextMessage = ({ message }: { message: string }) => {
    const isLinkText = message.match(/\bhttps?:\/\/\S+/gi);

    if (!isLinkText?.length) {
        return <>{message}</>;
    }

    const MessageWithLinks = (): JSX.Element => {
        let m = message.split(' ').map((l) => (
            <>
                {validURL(l) ? (
                    <a href={l} className="text-sky-400 tracking-wider" target="_blank">
                        {l}
                    </a>
                ) : (
                    ' ' + l + ' '
                )}
            </>
        ));

        return <>{m}</>;
    };
    return (
        <div className="flex flex-col gap-1">
            {isLinkText?.length ? <URLPreview url={isLinkText[0] ?? ''} /> : null}
            <span>
                <MessageWithLinks />
            </span>
        </div>
    );
};
