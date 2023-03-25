import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useChatRoomContext } from '../../context/context';
import { db } from '../../firebase';
import { UserInfo } from '../../models/types';
import { updateUserOnlineStatus } from '../apiOperations';

export const useLeftSideBar = () => {
    const currentUser: UserInfo = JSON.parse(localStorage.getItem('currentUser')!);
    const { signOut } = useChatRoomContext();
    const navigate = useNavigate();


    const handleSearch = async (userName: string) => {
        const usersSearchRef = collection(db, 'users');
        const roomsSearchRef = collection(db, 'chatRooms');

        const nameQuery = query(usersSearchRef, where('name', '==', userName.toLowerCase()));

        const roomQuery = query(roomsSearchRef, where('name', '==', userName.toLowerCase()));

        const usersSnapShot = await getDocs(nameQuery);

        const users = usersSnapShot.docs
            .map((doc) => {
                const { chatRooms, ...rest } = doc.data();
                rest.type = 'user';
                return rest;
            })
            .filter((doc) => doc.uid !== currentUser?.uid);

        const roomsSnapShot = await getDocs(roomQuery);
        const rooms = roomsSnapShot.docs.map((doc) => {
            doc.data().type = 'room';
            return doc.data();
        });

        return [...users, ...rooms];
    };

    const handleSignOut = async () => {
        signOut()
            .then(() => {
                updateUserOnlineStatus(currentUser.uid!, 'offline');
                localStorage.clear();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                navigate('/');
            });
    };

    return { handleSearch, currentUser, handleSignOut };
};
