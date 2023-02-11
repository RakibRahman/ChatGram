import { User, UserCredential } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { SetStateAction } from 'react';

export type CurrentUser = User | null | undefined;

export interface UserContext {
    currentUser: CurrentUser;
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
export type ChatUserInfo = Pick<User, 'displayName' | 'email' | 'photoURL' | 'uid'>;

type ChatRoomType = 'single' | 'room';

interface ChatRoomSingleUserInfo {
    email: string;
    name: string;
    id: string;
    photoURL: string;
}
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
        type: string;
    };
    type: ChatRoomType;
}

export interface SingleChatRoom extends ChatRoom {
    userOne: ChatRoomSingleUserInfo;
    userTwo: ChatRoomSingleUserInfo;
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
