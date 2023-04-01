import { useState } from 'react';
import { Menu } from 'react-feather';
import { useChatRoomContext } from '../../context/context';
import { Drawer } from '../common/Drawer';
import { ThemeSelector } from '../common/ThemeSelector';
import { CreateChatRoom } from '../CreateChatRoom/CreateChatRoom';
import { EditProfile } from '../EditProfile/EditProfile';
import { UserSignOut } from './UserSignOut';
import { JoinChatRoom } from '../JoinChatRoom/JoinChatRoom';
import { ContactList } from '../ContactList/ContactList';

export const LeftMainMenu = () => {
    const { currentUser } = useChatRoomContext();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isJoinModal, setIsJoinModal] = useState(false);
    const [isContactModal, setIsContactModal] = useState(false);

    return (
        <div>
            <button
                className="btn btn-sm rounded-md "
                aria-label="menu"
                onClick={() => setIsOpen(true)}
            >
                <Menu />
            </button>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="flex flex-col gap-2 min-h-[100dvh] justify-between">
                    <div>
                        <EditProfile />

                        <button
                            onClick={() => setIsOpenModal(true)}
                            className=" bg-transparent border-0 flex  items-center gap-3 hover:bg-base-300 w-full transition hover:opacity-80 mb-4 pl-4 py-1"
                        >
                            <img
                                src={
                                    'https://img.icons8.com/color/48/null/group-foreground-selected.png'
                                }
                                alt="group"
                                className="w-8 h-8 object-cover"
                            />{' '}
                            <p className="text-sm font-medium"> New chat room</p>
                        </button>

                        <button
                            onClick={() => setIsJoinModal(true)}
                            className=" bg-transparent border-0 flex  items-center gap-3 hover:bg-base-300 w-full transition hover:opacity-80 mb-4 pl-4 py-1"
                        >
                            <img
                                src={
                                    'https://img.icons8.com/external-bearicons-outline-color-bearicons/64/null/external-sign-up-call-to-action-bearicons-outline-color-bearicons-1.png'
                                }
                                alt="group"
                                className="w-8 h-8 object-cover"
                            />{' '}
                            <p className="text-sm font-medium"> Join chat room</p>
                        </button>

                        <button
                            onClick={() => setIsContactModal(true)}
                            className=" bg-transparent border-0 flex  items-center gap-3 hover:bg-base-300 w-full transition hover:opacity-80 mb-4 pl-4 py-1"
                        >
                            <img
                                src={'https://img.icons8.com/fluency/48/null/address-book.png'}
                                alt="group"
                                className="w-8 h-8 object-cover"
                            />{' '}
                            <p className="text-sm font-medium">Contacts</p>
                        </button>

                        <div className="bg-transparent border-0 flex  items-center gap-3 hover:bg-base-300 w-full transition hover:opacity-80 pl-4 py-1">
                            <img
                                src={'https://img.icons8.com/arcade/64/null/color-palette.png'}
                                alt="group"
                                className="w-8 h-8 object-cover"
                            />
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">Theme</p>
                                <ThemeSelector />
                            </div>
                        </div>
                    </div>

                    <div className="px-4 ml-auto">{currentUser ? <UserSignOut /> : null}</div>
                </div>
                {isOpenModal ? (
                    <CreateChatRoom
                        isOpen={isOpenModal}
                        onClose={() => {
                            setIsOpenModal(false);
                            setIsOpen(false);
                        }}
                    />
                ) : null}
                {isJoinModal ? (
                    <JoinChatRoom
                        isOpen={isJoinModal}
                        onClose={() => {
                            setIsJoinModal(false);
                            setIsOpen(false);
                        }}
                    />
                ) : null}

                {isContactModal ? (
                    <ContactList
                        isOpen={isContactModal}
                        onClose={() => {
                            setIsContactModal(false);
                            setIsOpen(false);
                        }}
                    />
                ) : null}
            </Drawer>
        </div>
    );
};
