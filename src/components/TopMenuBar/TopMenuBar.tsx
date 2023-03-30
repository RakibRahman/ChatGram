import React, { SetStateAction, useRef, useState } from 'react';
import { ChatRoom, UserInfo } from '../../models/types';
import { Loader } from '../common/Loader/Loader';
import { ProfileCard } from '../common/ProfileCard/ProfileCard';
import { useLeftSideBar } from '../LeftSideBar/useLeftSideBar';
import { useTopMenuBar } from './useTopMenuBar';
import { Search } from 'react-feather';

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
    const [selectedId, setSelectedId] = useState('');
    const { handleSearch } = useLeftSideBar();
    const { createOneToOneChatRoom, joinChatRoom } = useTopMenuBar(setSearchActive);
    const searchUsers = async (e: React.FormEvent) => {
        e.preventDefault();

        const q = searchQuery.current?.value;
        console.log(q);
        if (!q) return;
        setSearchActive(true);
        setLoading(true);
        if (q) {
            await handleSearch(q)
                .then((result) => {
                    if (result.length > 0) {
                        const users = result.filter((user) => user.type === 'single') as UserInfo[];
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
        searchResult?.users?.length === 0 &&
        searchResult?.rooms?.length === 0;

    const roomSearchCondition = isSearchActive && searchResult?.rooms?.length !== 0 && !loading;
    const userSearchCondition = isSearchActive && searchResult?.users?.length !== 0 && !loading;

    return (
        <div className="flex-grow ">
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
                                    setSelectedId('');
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
                        <Search />
                    </button>
                </div>
            </form>

            {isSearchActive ? (
                <div>
                    {noResultFound ? (
                        <p className="text-xs mt-4">No results found, please be more specific</p>
                    ) : null}
                    {loading ? (
                        <div className="w-full h-20 mt-12 grid place-items-center mr-10">
                            <Loader />
                        </div>
                    ) : null}
                    {userSearchCondition ? (
                        <div className="mt-1 flex flex-col gap-2">
                            <p className="font-semibold text-lg">Users</p>

                            {searchResult?.users?.map((user: UserInfo) => (
                                <div
                                    className={`transition-colors ease-in-out cursor-pointer ${
                                        selectedId === user?.uid
                                            ? 'bg-sky-400 bg-opacity-50 text-white  animate-pulse'
                                            : ''
                                    }  p-1 rounded-lg hover:text-white hover:bg-sky-500`}
                                    key={user?.uid}
                                    onClick={() => {
                                        setSelectedId(user.uid ?? '');
                                        createOneToOneChatRoom(user).then(() => {
                                            if (searchQuery?.current?.value) {
                                                searchQuery.current.value = '';
                                            }
                                            // localStorage.setItem('activeChat', user?.uid)
                                            setSelectedId('');
                                        });
                                    }}
                                >
                                    <ProfileCard
                                        name={user?.name!}
                                        pic={user?.photoURL!}
                                        lastActive={user?.lastLogin}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : null}

                    {roomSearchCondition ? (
                        <div className="flex flex-col gap-2 mt-2">
                            <p className="font-semibold text-lg">Rooms</p>
                            {searchResult?.rooms?.map((room: ChatRoom) => (
                                <div
                                    className={`transition-colors ease-in-out cursor-pointer ${
                                        selectedId === room?.id
                                            ? 'bg-sky-400 text-white bg-opacity-60 animate-pulse'
                                            : ''
                                    }  p-1 rounded-lg hover:text-white hover:bg-sky-500`}
                                    key={room?.id}
                                    onClick={() => {
                                        joinChatRoom(room?.id).then(() => {
                                            if (searchQuery?.current?.value) {
                                                searchQuery.current.value = '';
                                            }
                                            setSelectedId('');
                                        });
                                    }}
                                >
                                    <ProfileCard
                                        name={room?.name!}
                                        pic={room?.logo!}
                                        totalMembers={room?.members.length}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
};
