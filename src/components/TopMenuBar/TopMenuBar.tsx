import React, { SetStateAction, useRef, useState } from 'react';
import { ChatRoom, UserInfo } from '../../models/types';
import { Loader } from '../common/Loader/Loader';
import { ProfileCard } from '../common/ProfileCard/ProfileCard';
import { useLeftSideBar } from '../LeftSideBar/useLeftSideBar';
import { useTopMenuBar } from './useTopMenuBar';

interface TopMenuBarProps {
    isSearchActive: boolean;
    setSearchActive: React.Dispatch<SetStateAction<boolean>>;
}

interface SearchResult {
    users: UserInfo[] | null;
    rooms: ChatRoom[] | null;
}
export const TopMenuBar: React.FC<TopMenuBarProps> = ({ isSearchActive, setSearchActive }) => {
    const searchQuery = useRef<HTMLInputElement>(null);

    const [searchResult, setSearchResult] = useState<SearchResult>({
        users: [],
        rooms: [],
    });
    const [loading, setLoading] = useState(false);
    const { handleSearch, currentUser } = useLeftSideBar();
    const { createOneToOneChatRoom, joinChatRoom } = useTopMenuBar(setSearchActive);
    const searchUsers = async (e: React.FormEvent) => {
        e.preventDefault();

        const q = searchQuery.current?.value;
        if (!q) return;
        setSearchActive(true);
        setLoading(true);
        if (q) {
            await handleSearch(q)
                .then((result) => {
                    if (result.length > 0) {
                        const users = result.filter((user) => user.type === 'user') as UserInfo[];
                        const rooms = result.filter((room) => room.type === 'room') as ChatRoom[];
                        setSearchResult({
                            users,
                            rooms,
                        });
                    }
                })
                .catch((error) => {
                    console.log('error', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const noResultFound =
        !loading &&
        isSearchActive &&
        (searchResult?.users?.length === 0 || searchResult?.rooms?.length === 0);

    const roomSearchCondition = isSearchActive && searchResult?.rooms?.length !== 0 && !loading;
    const userSearchCondition = isSearchActive && searchResult?.users?.length !== 0 && !loading;

    return (
        <div className="flex-grow">
            <form onSubmit={searchUsers}>
                <div className="flex gap-1 relative">
                    <input
                        name="searchQuery"
                        type="text"
                        ref={searchQuery}
                        placeholder="Search…"
                        className=" input input-bordered w-full input-sm "
                    />
                    <div className="absolute right-16 top-1">
                        {isSearchActive ? (
                            <button
                                className="btn btn-xs  bg-base-100 text-base-content border-none"
                                onClick={() => {
                                    setSearchActive(false);
                                    if (searchQuery?.current?.value) {
                                        searchQuery.current.value = '';
                                        setSearchResult({
                                            users: [],
                                            rooms: [],
                                        });
                                    }
                                }}
                            >
                                X
                            </button>
                        ) : null}
                    </div>
                    <button className="btn btn-sm  rounded-md" type="submit">
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

            <div>
                {noResultFound ? (
                    <p className="text-sm mt-4">No results found, please be more specific</p>
                ) : null}
                {loading ? (
                    <div className="w-10 h-10 mt-10 grid place-items-center ml-5">
                        {' '}
                        <Loader />{' '}
                    </div>
                ) : null}
                {userSearchCondition ? (
                    <div className="my-1">
                        <p>Users</p>

                        {searchResult?.users?.map((user: UserInfo) => (
                            <div
                                key={user?.uid}
                                onClick={() => {
                                    createOneToOneChatRoom(user);
                                }}
                            >
                                <ProfileCard name={user?.name!} pic={user?.photoURL!} />
                            </div>
                        ))}
                    </div>
                ) : null}
                {roomSearchCondition ? (
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
                ) : null}
            </div>
        </div>
    );
};
