
import { Link } from 'react-router-dom';
import { Loader } from '../Loader';
import { useChatRoomList } from './useChatRoomList';


export const ChatRoomList = () => {

    const { currentUser, list, fetchStatus } = useChatRoomList();

    if (!currentUser) {
        return <h1>Log in to see chat rooms</h1>
    }

    if (fetchStatus.loading) {
        return <Loader />
    }
    return (
        <div className="container mx-auto px-4 border"><h1>ChatRoomList</h1>

            <ul>
                {list.map((chatRoom) => (
                    <li key={chatRoom.id}>
                        <Link to={chatRoom.id}>{chatRoom.name}</Link>
                        <p>{chatRoom?.recentMessage?.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
