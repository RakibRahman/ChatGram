import { useState } from 'react';
import { Menu } from 'react-feather';
import GroupIcon from '../../assets/group.png';
import ThemeIcon from '../../assets/theme.png';
import { useChatRoomContext } from '../../context/context';
import { Drawer } from '../common/Drawer';
import { ThemeSelector } from '../common/ThemeSelector';
import { CreateChatRoom } from '../CreateChatRoom/CreateChatRoom';
import { EditProfile } from '../EditProfile/EditProfile';
import { UserSignOut } from './UserSignOut';

export const LeftMainMenu = () => {
    const { currentUser } = useChatRoomContext();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <div>
            <button className="btn btn-sm rounded-md " onClick={() => setIsOpen(true)}>
                <Menu />
            </button>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="flex flex-col gap-2 min-h-[100dvh] justify-between">
                    <div>
                        <EditProfile />

                        <button
                            onClick={() => setIsOpenModal(true)}
                            className=" bg-transparent border-0 flex  items-center gap-3 hover:bg-base-300 w-full transition hover:opacity-80 mb-4 pl-4"
                        >
                            <img src={GroupIcon} alt="group" className="w-8 h-8 object-cover" />{' '}
                            <p className="text-sm font-medium"> New chat room</p>
                        </button>

                        <div className="bg-transparent border-0 flex  items-center gap-3 hover:bg-base-300 w-full transition hover:opacity-80 pl-4">
                            <img src={ThemeIcon} alt="group" className="w-8 h-8 object-cover" />
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">Theme</p>
                                <ThemeSelector />
                            </div>
                        </div>
                    </div>

                    <div className="px-4 ml-auto">{currentUser ? <UserSignOut /> : null}</div>
                </div>
                <CreateChatRoom
                    isOpen={isOpenModal}
                    onClose={() => {
                        setIsOpenModal(false);
                        setIsOpen(false);
                    }}
                />
            </Drawer>
        </div>
    );
};
