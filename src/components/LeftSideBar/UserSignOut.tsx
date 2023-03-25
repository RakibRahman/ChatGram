import { LogOut } from 'react-feather';
import { useLeftSideBar } from './useLeftSideBar';

export const UserSignOut = () => {
    const { handleSignOut } = useLeftSideBar();

    return (
        <>
            <button className="btn gap-2 btn-sm mb-2" onClick={handleSignOut}>
                Sign Out
                <LogOut size={18} />
            </button>
        </>
    );
};
