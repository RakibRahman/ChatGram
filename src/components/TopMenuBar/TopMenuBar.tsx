import React, { SetStateAction, useRef, useState } from 'react';
import { ChatRoom, UserInfo } from '../../models/types';
import { ProfileCard } from '../common/ProfileCard/ProfileCard';
import { useLeftSideBar } from '../LeftSideBar/useLeftSideBar';
import { useTopMenuBar } from './useTopMenuBar';

interface TopMenuBarProps {
    isSearchActive: boolean;
    setSearchActive: React.Dispatch<SetStateAction<boolean>>;
}
export const TopMenuBar: React.FC<TopMenuBarProps> = ({ isSearchActive, setSearchActive }) => {
    const searchQuery = useRef<HTMLInputElement>(null);

    const [searchResult, setSearchResult] = useState<any>({
        users: [],
        groups: [],
    });

    const { handleSearch, currentUser } = useLeftSideBar();
    const { createOneToOneChatRoom, joinChatRoom } = useTopMenuBar(setSearchActive);
    const searchUsers = async (e: React.FormEvent) => {
        e.preventDefault();

        const q = searchQuery.current?.value;
        if (!q) return;
        setSearchActive(true);
        if (q) {
            await handleSearch(q).then((result) => {
                // console.log('search by result', result);
                if (result.length > 0) {
                    const users = result.filter((user) => user.type === 'user');
                    const rooms = result.filter((room) => room.type === 'room');
                    setSearchResult({
                        users,
                        rooms,
                    });
                }
            });
        }
    };
    return (
        <div className="form-control ">
            <div className="input-group ">
                <form onSubmit={searchUsers}>
                    <div className="flex gap-1 relative">
                        <input
                            name="searchQuery"
                            type="text"
                            ref={searchQuery}
                            placeholder="Search…"
                            className="input input-bordered input-sm w-full max-w-xs "
                        />
                        <div className="absolute right-14 top-1">
                            {isSearchActive ? (
                                <button
                                    className="btn btn-xs bg-transparent border-none"
                                    onClick={() => {
                                        setSearchActive(false);
                                        if (searchQuery?.current?.value) {
                                            searchQuery.current.value = '';
                                            setSearchResult([]);
                                        }
                                    }}
                                >
                                    X{' '}
                                </button>
                            ) : null}
                        </div>
                        <button className="btn btn-sm" type="submit">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
            <div>
                {isSearchActive && searchResult.length === 0 ? (
                    <p>No results found, please be more specific</p>
                ) : null}
                {isSearchActive && (
                    <div>
                        <p>Users</p>

                        {searchResult?.users?.map((user: UserInfo) => (
                            <div
                                key={user?.uid}
                                onClick={() => {
                                    console.log(user.uid + currentUser?.uid);
                                    const chatRoomId = user.uid + currentUser?.uid;
                                    createOneToOneChatRoom(user);
                                }}
                            >
                                <ProfileCard name={user?.name!} pic={user?.photoURL!} />
                            </div>
                        ))}
                    </div>
                )}
                {isSearchActive && (
                    <div>
                        <p>Rooms</p>
                        {searchResult?.rooms?.map((room: ChatRoom) => (
                            <div
                                key={room?.id}
                                onClick={() => {
                                    joinChatRoom(room?.id);
                                }}
                            >
                                <ProfileCard name={room?.name!} pic={room?.logo!} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
