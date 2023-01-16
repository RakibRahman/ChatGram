import firebase from "firebase/compat/app";
import { ActionCodeSettings, AuthError, CustomParameters, UserCredential, User, } from 'firebase/auth';
import { Timestamp } from "firebase/firestore";

export type CurrentUser = UserCredential | undefined;

export interface UserContext {
    currentUser: User | null | undefined,
    loading: boolean,
    userError: Error | undefined
    signInWithGoogle: () => void
    signOut: () => void
}
interface SentMessageType {
    message: string;
    uid: string;

}
export type ChatUserInfo = Pick<User, 'displayName' | 'email' | 'photoURL' | 'uid'>
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
        timeStamp: Timestamp;
    };

}
export interface CreateChatRoom {
    createNewChatRoom: () => Promise<void>
    currentUser: ChatRoom['createdBy']
}