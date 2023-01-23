import React from 'react';

interface DrawerProps {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    side?: 'left' | 'right';
}
export const Drawer: React.FC<DrawerProps> = ({
    children,
    isOpen,
    setIsOpen,
    side = 'left',
}) => {
    return (
        <main
            className={
                ' fixed overflow-hidden z-10 bg-black  bg-opacity-50 inset-0 transform ease-in-out ' +
                (isOpen
                    ? ' transition-opacity opacity-100 duration-500 translate-y-0  '
                    : ' transition-all delay-500 opacity-0 translate-y-full  ')
            }
        >
            <section
                className={
                    ` w-screen max-w-lg ${side}-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform ` +
                    (isOpen ? ' translate-y-0 ' : ' translate-y-full ')
                }
            >
                <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-hidden  h-full">
                    <header className="p-4 font-bold text-lg">Header</header>
                    {children}
                </article>
            </section>
            <section
                className=" w-screen h-full cursor-pointer "
                onClick={() => {
                    setIsOpen(false);
                }}
            ></section>
        </main>
    );
};
