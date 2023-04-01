import React, { useState } from 'react';
import { ProfileCard } from '../common/ProfileCard/ProfileCard';
import { ModalV2 } from '../common/modal/ModalV2';
import { useContactList } from './useContactList';
interface ContactProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ContactList: React.FC<ContactProps> = ({ isOpen, onClose }) => {
    const { navigateToChat, contactList } = useContactList();
    const [query, setQuery] = useState('');

    return (
        <div>
            <ModalV2
                hideYesBtn
                noText="Close"
                isOpen={isOpen}
                onClose={onClose}
                yesText="Join"
                title="Contacts"
                onConfirm={() => { }}
            >
                <div className="form-control max-w-96">
                    <div></div>
                    <input
                        // ref={chatRoomId}
                        type="text"
                        placeholder="Search Contacts"
                        className="input input-md w-full max-w-full border focus:outline-none"
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                    {contactList
                        .filter((q) => q?.name?.includes(query))
                        ?.map((contact) => (
                            <div className="mt-5 max-h-96 overflow-y-auto">
                                <div
                                    className="hover:opacity-60"
                                    role="button"
                                    onClick={() => {
                                        navigateToChat(contact);
                                        onClose();
                                    }}
                                >
                                    <ProfileCard
                                        lastActive={contact.lastActive ?? ''}
                                        name={contact.name ?? ''}
                                        pic={contact?.photoURL ?? ''}
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </ModalV2>
        </div>
    );
};
