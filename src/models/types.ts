import firebase from "firebase/compat/app";
import { ActionCodeSettings, AuthError, CustomParameters, UserCredential, User } from 'firebase/auth';

export type CurrentUser = UserCredential | undefined;

export interface UserContext {
    currentUser: CurrentUser,
    loading: boolean,
    userError: AuthError | undefined
    signInWithGoogle: () => void
}
interface SentMessageType {
    message: string;
    uid: string;

}