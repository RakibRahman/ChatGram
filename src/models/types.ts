import { User, UserCredential } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { SetStateAction } from 'react';

export type CurrentUser = UserCredential | undefined;

export interface UserContext {
    currentUser: User | null | undefined;
    loading: boolean;
    userError: Error | undefined;
    signInWithGoogle: () => void;
    signOut: () => void;
    themeName: string;
    setThemeName: React.Dispatch<SetStateAction<string>>;
}
interface SentMessageType {
    message: string;
    uid: string;
}
export type ChatUserInfo = Pick<
    User,
    'displayName' | 'email' | 'photoURL' | 'uid'
>;
export interface ChatRoom {
    name: string;
    createdBy: Partial<UserCredential['user']>;
    createdAt: Timestamp;
    id: string;
    logo: string;
    members: string[];
    recentMessage: {
        message: string;
        sentBy: string;
        timestamp: Timestamp;
    };
}
export interface CreateChatRoom {
    createNewChatRoom: () => Promise<void>;
    currentUser: ChatRoom['createdBy'];
}
export interface GroupMessage {
    message: string;
    sentBy: {
        name: string;
        id: string;
        pic: string;
    };
    sentTime: {
        seconds: number;
        nanoseconds: number;
    };
    type: string;
    chatRoomId: string;
}

export interface UserInfo {
    uid: string;
    name: string;
    email: string;
    photoURL: string;
    chatRooms: string[];
}

export interface ChatCardProps {
    id: string;
    name: string;
    logo: string;
    recentMessage: ChatRoom['recentMessage'];
    isActive: string;
}
