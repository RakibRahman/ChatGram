import mBG from '../../assets/wave.svg';
import { useChatRoomContext } from '../../context/context';
import { createUser } from '../apiOperations';

export const Login = () => {
    const { signInWithGoogle } = useChatRoomContext();

    return (
        <div
            id="chatApplanding"
            className="hero "
            style={{
                backgroundImage: `url(${mBG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="grid place-items-center  py-10 h-screen text-white">
                <div className="text-center">
                    <img
                        src="https://img.icons8.com/arcade/64/null/filled-chat.png"
                        className="text-center mx-auto animate-pulse"
                    />
                    <p className=" text-xl mb-4">Welcome to ChatGram</p>
                    <p className=" text-xl mb-4">Log in with your Google account to continue</p>

                    <button
                        className="btn  text-white"
                        onClick={() => {
                            signInWithGoogle().then((user) => {
                                localStorage.setItem(
                                    'currentUser',
                                    JSON.stringify({
                                        uid: user?.user?.uid ?? '',
                                        name: user?.user?.displayName ?? '',
                                        email: user?.user?.email ?? '',
                                        photoURL: user?.user?.photoURL ?? '',
                                    })
                                );

                                createUser(user?.user);
                            });
                        }}
                    >
                        Continue with google
                    </button>
                </div>
            </div>
        </div>
    );
};
