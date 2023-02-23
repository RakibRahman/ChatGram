import { useEffect, useRef } from 'react';
import { FileUpload } from '../FileUpload/FileUpload';
import { useSentMessage } from './useSentMessage';

export const SentMessage = () => {
    const messageRef = useRef<HTMLInputElement>(null);

    const { lastMessage, currentUser, sendMessage } = useSentMessage();

    useEffect(() => {
        // messageRef.current?.focus();
    }, []);

    return (
        <div className="">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (messageRef.current && currentUser) {
                        lastMessage(messageRef.current?.value!);
                        sendMessage(messageRef.current?.value!);
                    }
                    if (messageRef.current) {
                        messageRef.current.value = '';
                    }
                }}
            >
                <div className="form-control">
                    <label className="label">
                        {/* <span className="label-text">Enter amount</span> */}
                    </label>
                    <label className="input-group">
                        <FileUpload />

                        {/* <button className="btn btn-square btn-md">

                        </button> */}
                        <input
                            ref={messageRef}
                            type="text"
                            placeholder="Your message here"
                            className="input input-bordered focus:outline-none  w-full input-md"
                        />
                        <button className="btn btn-square btn-md" type="submit">
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
                            </svg>
                        </button>
                    </label>
                </div>
            </form>
        </div>
    );
};
