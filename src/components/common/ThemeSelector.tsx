import { useLayoutEffect, useState } from 'react';
import { themeChange } from 'theme-change';
import { useChatRoomContext } from '../../context/context';
import { themes } from '../../utilities/data';
import { ChevronDown } from 'react-feather';
export const ThemeSelector = () => {
    const { themeName, setThemeName } = useChatRoomContext();
    const [toggle, setToggle] = useState(false);
    const [isThemeChange, setThemeChange] = useState(false);

    useLayoutEffect(() => {
        themeChange(false);
    }, [isThemeChange]);

    return (
        <div>
            <button
                className="flex justify-between w-full cursor-pointer rounded-md border p-2 items-center  text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm btn-sm "
                onClick={() => setToggle((t) => !t)}
            >
                <span className="capitalize">{themeName}</span>

                <ChevronDown />
            </button>

            <div className="w-36 relative mt-1">
                {toggle ? (
                    <ul
                        data-choose-theme
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        tabIndex={-1}
                        role="listbox"
                        aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-option-3"
                    >
                        {themes.map((theme) => (
                            <li
                                key={theme}
                                className=" relative cursor-pointer select-none  "
                                id="listbox-option-0"
                                role="option"
                                value={theme}
                                onClick={(e) => {
                                    setThemeName(theme);
                                    localStorage.setItem('theme', theme);
                                    setToggle(false);
                                    setThemeChange((s) => !s);
                                }}
                            >
                                <span
                                    className={`${
                                        themeName === theme
                                            ? 'bg-red-100 text-black w-full px-2 py-2 capitalize'
                                            : 'px-2 py-2 capitalize'
                                    }`}
                                >
                                    {theme}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        </div>
    );
};
