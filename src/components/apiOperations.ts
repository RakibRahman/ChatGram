import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, timeStamp } from '../firebase';
import { CurrentUser, UserInfo } from '../models/types';
import { handleResults } from '../utilities/handleResults';

export const joinChatRoom = async (chatRoomId: string, userId: string) => {
    const chatRoomRef = doc(db, 'chatRooms', chatRoomId);
    const userRef = doc(db, 'users', userId);

    const updateChatRoomMembers = await updateDoc(chatRoomRef, {
        members: arrayUnion(userId),
    });

    const updateUserChatRooms = await updateDoc(userRef, {
        chatRooms: arrayUnion(chatRoomId),
    });

    const [chatRoomResult, userResult] = await Promise.allSettled([
        updateChatRoomMembers,
        updateUserChatRooms,
    ]);

    handleResults([chatRoomResult, userResult]);
};

export const updateUserOnlineStatus = async (
    userId: string,
    status: 'online' | 'offline' | 'away' = 'online'
): Promise<void> => {
    if (!userId) return;
    const userRef = doc(db, 'users', userId);

    await setDoc(
        userRef,
        {
            status,
        },
        { merge: true }
    )
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const createUser = async (currentUser: CurrentUser) => {
    if (!currentUser) return;
    const { uid, displayName, email, photoURL } = currentUser;
    const docRef = doc(db, 'users', uid);
    const userInfo = {
        uid: uid,
        name: displayName?.toLowerCase(),
        email,
        photoURL,
        lastLogin: currentUser?.metadata?.lastSignInTime,
        status: 'online',
        createdAt: timeStamp,
        updatedAt: timeStamp,
        story: "Hey There! I'm using Chatgram.",
        phone: '',
        socialLinks: {
            fb: '',
            linkedin: '',
            twitter: '',
        },
    };

    localStorage.setItem('currentUser', JSON.stringify(userInfo));

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log('userAlreadyExists');
        setDoc(
            docRef,
            {
                lastLogin: currentUser?.metadata?.lastSignInTime,
                status: 'online',
            },
            { merge: true }
        );

        return;
    }
    setDoc(docRef, userInfo, { merge: true });
};

export const checkUserStatus = async (id: string): Promise<UserInfo | null> => {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        return docSnap.data() as UserInfo;
    } else {
        // doc.data() will be undefined in this case
        console.log('No such user!');
    }
    return null;
};

export const getUserData = (id: string): UserInfo | null => {
    let userInfo = {} as UserInfo;
    if (!id) return null;
    checkUserStatus(id)
        .then((d) => {
            if (d) {
                console.log(d);
                userInfo = d;
            }
        })
        .catch((e) => {
            console.log(e);
        });
    return userInfo ?? null;
};
