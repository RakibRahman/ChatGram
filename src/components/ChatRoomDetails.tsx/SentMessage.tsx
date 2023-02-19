import { useEffect, useRef } from 'react';
import { useChatRoomDetails } from './useChatRoomDetails';
import { useSentMessage } from './useSentMessage';

export const SentMessage = () => {
    const messageRef = useRef<HTMLInputElement>(null);
    const { lastMessage, currentUser, sendTextMessage } = useSentMessage();
    useEffect(() => {
        messageRef.current?.focus();
    }, []);
    return (
        <div className="">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (messageRef.current && currentUser) {
                        lastMessage(messageRef.current?.value!);
                        sendTextMessage(messageRef.current?.value!);
                    }
                    if (messageRef.current) {
                        messageRef.current.value = '';
                    }
                }}>
                <div className="form-control">
                    <label className="label">
                        {/* <span className="label-text">Enter amount</span> */}
                    </label>
                    <label className="input-group">
                        <button className="btn btn-square btn-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                            </svg>
                        </button>
                        <input ref={messageRef} type="text" placeholder="Your message here" className="input input-bordered w-full input-md" />
                        <button className="btn btn-square btn-md" type='submit'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                />
                            </svg></button>
                    </label>
                </div>
            </form>

        </div>
    );
};
