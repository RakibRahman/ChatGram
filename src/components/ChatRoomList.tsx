import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { accessCollection } from '../firebase'
import { Link } from "react-router-dom";
export const ChatRoomList = () => {
    const [value, loading, error] = useCollection(
        accessCollection('chatRooms'));

    return (
        <div><h1>ChatRoomList</h1>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            <ul className="menu bg-base-100 w-56">

                {value?.docs.map((doc) => (
                    <li><Link to={doc.data().id}>{(doc.data().name)}</Link></li>

                ))}
            </ul>
        </div>
    )
}
