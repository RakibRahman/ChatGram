import { useLeftSideBar } from './useLeftSideBar';

export const UserSignOut = () => {
    const { handleSignOut } = useLeftSideBar();

    return (
        <>   <button
            className="btn mb-2"
            onClick={handleSignOut}
        >
            Sign Out
        </button></>
    )
}
