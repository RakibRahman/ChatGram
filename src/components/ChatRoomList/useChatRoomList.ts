import { useLayoutEffect, useRef, useState } from 'react';
import { collection, doc, getDoc, getDocs, query, where, onSnapshot } from "firebase/firestore";
import { useChatRoomContext } from '../../context/context';
import { db } from '../../firebase';
import { ChatRoom } from '../../models/types';


export const useChatRoomList = () => {
    const { currentUser } = useChatRoomContext();
    const isMounted = useRef(false);
    const [chatList, setChatList] = useState<ChatRoom[]>([])
    const [fetchStatus, setFetchStatus] = useState<{
        loading: boolean,
        error: Error | ''
    }>({
        loading: false,
        error: ''
    })

    const getChatList = async () => {
        const tempList: ChatRoom[] = [];
        const usersRef = doc(db, "users", currentUser?.uid!);
        const chatRoomsRef = collection(db, "chatRooms");
        await getDoc(usersRef).then(async (doc) => {
            setFetchStatus({ ...fetchStatus, loading: true })
            const q = query(chatRoomsRef, where("id", 'in', doc.data()?.chatRooms));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                tempList.push(doc.data() as ChatRoom);
            });
        }).then(() => {
            setChatList(tempList);
        }).catch(err => {
            setFetchStatus({ ...fetchStatus, error: err });
        })
            .finally(() => {
                setFetchStatus({ ...fetchStatus, loading: false });
            })

    }

    useLayoutEffect(() => {
        getChatList();

        // isMounted.current = true;
        // if (isMounted.current) {
        //     getChatList();
        // }
        // return () => {
        //     isMounted.current = false;
        // };
    }, []);
    return { currentUser, list: chatList ?? [], fetchStatus } as const;
}
