import { createContext, FC, useContext, useState } from 'react';
import { useAuthState, useSignInWithGoogle, useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { UserContext } from '../models/types';

interface ChatRoomDataProp {
    children: React.ReactNode;
}
const context = createContext({} as UserContext);

export function useChatRoomContext() {
    const c = useContext(context);
    if (c === undefined) throw new Error('useCtx must be inside a Provider with a value');
    return c;
}

export const ChatRoomData: FC<ChatRoomDataProp> = ({ children }) => {
    // const [user, setUser] = useState<CurrentUser>(null);
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const [signOut] = useSignOut(auth);
    const [user, loading, error] = useAuthState(auth);
    const [themeName, setThemeName] = useState(localStorage.getItem('theme') ?? 'dark');
    // const [refetch,set]

    // const values = useMemo(()=>())
    return (
        <context.Provider
            value={{
                currentUser: user,
                loading,
                userError: error,
                signInWithGoogle,
                signOut,
                themeName,
                setThemeName,
            }}
        >
            {children}
        </context.Provider>
    );
};
