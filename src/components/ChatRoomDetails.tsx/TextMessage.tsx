import URLPreview from '../FilePreview/URLPreview';

export const TextMessage = ({ message }: { message: string }) => {
    const isLinkText = message.match(/\bhttps?:\/\/\S+/gi);

    if (!isLinkText?.length) {
        return <>{message}</>;
    }

    function isValidUrl(url: string) {
        const matchpattern =
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
        return matchpattern.test(url);
    }

    const MessageWithLinks = (): JSX.Element => {
        let m = message.split(' ').map((l) => (
            <span>
                {isValidUrl(l) ? (
                    <a href={l} className="text-sky-400 tracking-wider" target="_blank">
                        {l}
                    </a>
                ) : (
                    ' ' + l + ' '
                )}
            </span>
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
