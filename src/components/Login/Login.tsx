import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatRoomContext } from '../../context/context';
import BG from '../../assets/login_bg.svg';
import { joinChatRoom, updateUserOnlineStatus, createUser } from '../apiOperations';

export const Login = () => {
    const navigate = useNavigate();
    const { signInWithGoogle, currentUser, loading, userError, signOut } =
        useChatRoomContext();

    // useEffect(() => {
    //     if (currentUser) {
    //         navigate('/');
    //     }
    // }, [currentUser]);

    console.log(currentUser)

    return (
        <div className="hero" style={{ backgroundImage: `url(${BG})` }}>
            <div className="grid place-items-center  py-10 h-screen">
                <button
                    className="btn"
                    onClick={() => {
                        signInWithGoogle();

                    }}
                >
                    Log in with google
                </button>
            </div>
        </div>
    );
};
