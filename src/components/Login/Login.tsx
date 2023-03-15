import { useEffect } from 'react';
import BG from '../../assets/login_bg.svg';
import { useChatRoomContext } from '../../context/context';
import { createUser } from '../apiOperations';

export const Login = () => {
    const { signInWithGoogle } = useChatRoomContext();

    return (
        <div
            className="hero"
            style={{
                backgroundImage: `url(${BG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="grid place-items-center  py-10 h-screen">
                <button
                    className="btn"
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
                    Log in with google
                </button>
            </div>
        </div>
    );
};
