import { Link } from 'react-router-dom';
import { useChatRoomContext } from '../../context/context';

export const Error404 = () => {
    const { currentUser } = useChatRoomContext();
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
            <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>

            <span className="relative   text-white mt-4 ">
                {currentUser ? null : 'Log in with your ChatGram account to continue'}
            </span>
            <button className="mt-5">
                <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
                    <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

                    <Link to={'/'}>
                        <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                            {currentUser ? 'Go Home' : 'Log in'}
                        </span>
                    </Link>
                </a>
            </button>
        </main>
    );
};
