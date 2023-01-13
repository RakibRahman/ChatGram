import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { accessCollection, db } from '../../firebase'
import { getFirestore, serverTimestamp, collection, query, where } from "firebase/firestore";
import { useParams } from 'react-router-dom'
export const ChatRoomDetails = () => {
    const { chatRoomId } = useParams()

    console.log(chatRoomId)
    const chatRoomsRef = collection(db, "chatRooms");


    // Create a query against the collection.
    const q = query(chatRoomsRef, where("id", "==", chatRoomId));
    const [value, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    console.log(value?.docs.map((d) => d.data()))

    return (
        <div>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            <ul className="menu bg-base-100 w-56">

                {value?.docs.map((doc) => (
                    <li> {(doc.data().name)}</li>

                ))}
            </ul></div>
    )
}
