import firebase from "firebase/compat/app";
import { ActionCodeSettings, AuthError, CustomParameters, UserCredential, User } from 'firebase/auth';
import { Timestamp } from "firebase/firestore";

export type CurrentUser = UserCredential | undefined;

export interface UserContext {
    currentUser: CurrentUser,
    loading: boolean,
    userError: AuthError | undefined
    signInWithGoogle: () => void
    signOut: () => void
}
interface SentMessageType {
    message: string;
    uid: string;

}

export interface ChatRoom {
    name: string;
    createdBy: Partial<UserCredential['user']>;
    createdAt: Timestamp;
    id: string;

}