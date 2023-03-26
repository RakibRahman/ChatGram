import { useEffect, useRef } from 'react';
import { FileUpload } from '../FileUpload/FileUpload';
import { useSentMessage } from './useSentMessage';
import { Send } from 'react-feather';

export const SentMessage = () => {
    const messageRef = useRef<HTMLInputElement>(null);

    const { lastMessage, currentUser, sendMessage } = useSentMessage();

    useEffect(() => {
        messageRef.current?.focus();
    }, []);

    return (
        <div className="pb-2">
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
                            <Send />
                        </button>
                    </label>
                </div>
            </form>
        </div>
    );
};
