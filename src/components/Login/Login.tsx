import BG from '../../assets/login_bg.svg';
import { useChatRoomContext } from '../../context/context';

export const Login = () => {
    const { signInWithGoogle } = useChatRoomContext();

    return (
        <div className="hero" style={{ backgroundImage: `url(${BG})` }}>
            <div className="grid place-items-center  py-10 h-screen">
                <button
                    className="btn"
                    onClick={() => {
                        signInWithGoogle();
                    }}
                >
                    Log in with google
                </button>
            </div>
        </div>
    );
};
