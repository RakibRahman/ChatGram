import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from './useUserProfile'

export const UserProfile = () => {
    const { userInfo, loading, error } = useUserProfile();
    const navigate = useNavigate();

    return (
        <div className="h-96">
            <button
                className="btn p-0 bg-transparent border-none"
                onClick={() => {
                    navigate(-1);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-base-content"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                    />
                </svg>
            </button>
            <div className="hero" >
                <div className="hero-overlay bg-opacity-60  py-10"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="avatar">
                        <div className="w-24 rounded">
                            <img src={userInfo?.photoURL!} />
                        </div>
                    </div>
                    <div className="max-w-full">
                        <h1 className="mb-5 text-5xl font-bold capitalize">{userInfo?.name}</h1>
                        <p>Email: {userInfo?.email}</p>
                        <p>Last Login At: {userInfo?.lastLogin}</p>



                    </div>
                </div>
            </div>
        </div>
    )
}
