import React from 'react';

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
                ' fixed overflow-hidden z-10 bg-black  bg-opacity-70 inset-0 transform ease-in-out ' +
                (isOpen
                    ? ' transition-opacity opacity-100 duration-200 translate-y-0  '
                    : ' transition-all delay-100 opacity-0 translate-y-full  ')
            }
        >
            <section
                className={
                    ` w-screen max-w-xs ${side}-0 absolute overflow-hidden  h-screen shadow-xl delay-100 duration-200 ease-in-out transition-all transform ` +
                    (isOpen ? ' translate-y-0 ' : ' translate-y-full ')
                }
            >
                <div className="relative w-screen max-w-lg bg-white flex flex-col space-y-6 overflow-hidden  h-full">
                    {/* <header className="p-4 font-bold text-lg">Header</header> */}
                    {children}
                </div>
            </section>
            <section
                className=" w-screen h-screen cursor-pointer overflow-hidden"
                onClick={() => {
                    setIsOpen(false);
                }}
            ></section>
        </main>
    );
};
