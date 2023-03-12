import { User, UserCredential } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { SetStateAction } from 'react';

export type CurrentUser = User | null | undefined;

export interface UserContext {
    currentUser: CurrentUser;
    loading: boolean;
    userError: Error | undefined;
    signInWithGoogle: () => Promise<UserCredential | undefined>;
    signOut: () => Promise<boolean>;
    themeName: string;
    setThemeName: React.Dispatch<SetStateAction<string>>;
}

export type ChatUserInfo = Pick<User, 'displayName' | 'email' | 'photoURL' | 'uid'>;

type ChatRoomType = 'single' | 'room';

interface ChatRoomSingleUserInfo {
    email: string;
    name: string;
    uid: string;
    photoURL: string;
}
export interface ChatRoom {
    name: string;
    createdBy: string;
    createdAt: Timestamp;
    id: string;
    logo: string;
    members: string[];
    recentMessage: {
        message: string;
        name: string;
        timestamp: Timestamp;
        type: string;
        uid: string;
    };
    type: ChatRoomType;
    story: string;
    admins: string[];
}

export interface SingleChatRoom extends ChatRoom {
    userOne: ChatRoomSingleUserInfo;
    userTwo: ChatRoomSingleUserInfo;
    userOneId: string;
    userTwoId: string;
}
export interface CreateChatRoom {
    createNewChatRoom: () => Promise<void>;
    currentUser: ChatRoom['createdBy'];
}
export interface GroupMessage {
    message: string;
    sentBy: string;
    sentTime: {
        seconds: number;
        nanoseconds: number;
    };
    type: 'text' | 'image' | 'video' | 'link' | 'text-link';
    chatRoomId: string;
    messageId: string;
    fileLink?: string;
    fileId?: string;
}

export interface UserInfo {
    uid: string;
    name: string;
    email: string;
    photoURL: string;
    photoURLPath?: string;
    chatRooms: string[];
    lastLogin: string;
    status: string;
    createdAt: Timestamp;
    story: string;
    phone?: string;
    socialLinks: {
        fb?: string;
        linkedin?: string;
        twitter?: string;
    };
}

export type RecentMessage = ChatRoom['recentMessage'];
export interface ChatCardProps {
    id: string;
    name: string;
    logo: string;
    recentMessage: RecentMessage;
    isActive: string;
    currentUserId: string;
}

export type UserListHashMap = Record<string, ChatRoomSingleUserInfo>;
