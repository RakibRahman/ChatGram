import { FirebaseApp, } from 'firebase/app'
import { useContext, createContext, useEffect, FC, useState } from 'react'
import { CurrentUser, UserContext } from '../models/types'
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase'


interface ChatRoomDataProp {
    children: React.ReactNode
}
const context = createContext({} as UserContext);

export function useChatRoomContext() {
    const c = useContext(context);
    if (c === undefined)
        throw new Error("useCtx must be inside a Provider with a value");
    return c;
}






export const ChatRoomData: FC<ChatRoomDataProp> = ({ children }) => {
    // const [user, setUser] = useState<CurrentUser>(null);
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    return (
        <context.Provider value={{
            currentUser: user,
            loading,
            userError: error,
            signInWithGoogle
        }}>
            {children}
        </context.Provider>
    )

}
