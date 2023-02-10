import React, { useRef, useState } from 'react';
import { useChatRoomContext } from '../context/context';
import { themes } from '../utilities/data';
export const ThemeSelector = () => {
    // const themeName = useRef<HTMLSelectElement>(null)
    //selected={themeName === localStorage.getItem('theme')}
    const { themeName, setThemeName } = useChatRoomContext();
    const [toggle, setToggle] = useState(false);
    console.log(themeName === localStorage.getItem('theme'));
    return (
        <div>
            <p className="text-sm font-medium text-white">Theme</p>
            <button
                className="flex justify-between w-full cursor-pointer rounded-md border border-gray-300 py-2 px-2 items-center  text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm text-white"
                onClick={() => setToggle((t) => !t)}
            >
                <span>{themeName}</span>

                <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
            <div className="w-52 relative mt-1">
                {toggle ? (
                    <ul
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        tabIndex={-1}
                        role="listbox"
                        aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-option-3"
                    >
                        {themes.map((theme) => (
                            <li
                                className="text-gray-900 relative cursor-pointer select-none flex justify-between items-center  hover:bg-gray-200 "
                                id="listbox-option-0"
                                role="option"
                                onClick={(e) => {
                                    setThemeName(theme);
                                    localStorage.setItem('theme', theme);
                                    setToggle(false);
                                }}
                            >
                                <span
                                    className={`${
                                        themeName === theme
                                            ? 'bg-green-400 w-full px-2 py-2'
                                            : 'px-2 py-2'
                                    }`}
                                >
                                    {' '}
                                    {theme}
                                </span>
                                {themeName === theme ? <p></p> : null}
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        </div>
    );
};
