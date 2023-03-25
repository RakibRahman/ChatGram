import React from 'react';
import { ChevronLeft, ChevronsLeft } from 'react-feather';

interface DrawerProps {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    side?: 'left' | 'right';
}

export const Drawer: React.FC<DrawerProps> = ({ children, isOpen, setIsOpen, side = 'left' }) => {
    return (
        <main
            className={
                'cursor-pointer fixed  z-10 bg-black  bg-opacity-70 inset-0 transform ease-in-out  min-h-screen' +
                (isOpen
                    ? ' transition-opacity opacity-100 duration-200 translate-y-0  '
                    : ' transition-all delay-100 opacity-0 translate-y-full  ')
            }
        >
            <section
                className={
                    ` w-screen max-w-xs ${side}-0 absolute   shadow-xl delay-100 duration-200 ease-in-out transition-all transform ` +
                    (isOpen ? ' translate-y-0 ' : ' translate-y-full ')
                }
            >
                <div className="relative menu w-80 bg-base-100 text-base-content h-full">
                    {/* <header className="p-4 font-bold text-lg">Header</header> */}
                    {children}

                    <div
                        className="cursor-pointer absolute -right-3 z-20 top-1/2 text-base bg-base-300 rounded-full hover:scale-105 transition-transform"
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        <ChevronsLeft size={30} />
                    </div>
                </div>
            </section>
        </main>
    );
};
