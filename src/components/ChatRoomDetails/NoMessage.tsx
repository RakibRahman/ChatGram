import { useSentMessage } from '../SentMessage/useSentMessage';

const greetingImages = [
    'https://firebasestorage.googleapis.com/v0/b/my-chat-87035.appspot.com/o/general%2F4AIB.gif?alt=media&token=2e5f78d4-dea5-4d95-9cf3-c05c603fcd4f',
    'https://firebasestorage.googleapis.com/v0/b/my-chat-87035.appspot.com/o/general%2F4foo.gif?alt=media&token=91bff5e5-b3ff-4e62-99bb-6d3b475e40b4',
    'https://firebasestorage.googleapis.com/v0/b/my-chat-87035.appspot.com/o/general%2F5Tz.gif?alt=media&token=54a1ee77-1a31-4048-9162-5076e68ad42d',
    'https://firebasestorage.googleapis.com/v0/b/my-chat-87035.appspot.com/o/general%2FAQEf.gif?alt=media&token=f19259ea-d98b-402f-b812-3390d53c0a4c',
    'https://firebasestorage.googleapis.com/v0/b/my-chat-87035.appspot.com/o/general%2FAQEf.gif?alt=media&token=f19259ea-d98b-402f-b812-3390d53c0a4c',
];
const getRandomIndex = Math.floor(Math.random() * greetingImages.length);

export const NoMessage = () => {
    const { lastMessage, sendMessage } = useSentMessage();

    const sendGreetingMessage = () => {
        lastMessage('', 'image');
        // no file id
        sendMessage('', 'image', '', greetingImages[getRandomIndex]);
    };
    return (
        <div className="w-full  h-screen  grid place-items-center overflow-hidden font-semibold text-center">
            <div className="grid place-items-center gap-2  rounded-xl p-2 bg-white/30 bg-opacity-50 backdrop-blur-xl  drop-shadow-lg">
                <p>No messages here yet...</p>
                <p>Send a message or tap the greeting below.</p>
                <button onClick={sendGreetingMessage}>
                    <img
                        loading="lazy"
                        className="w-56 max-h-56 object-cover rounded-lg"
                        src={greetingImages[getRandomIndex]}
                        alt="greeting"
                    />
                </button>
            </div>
        </div>
    );
};
