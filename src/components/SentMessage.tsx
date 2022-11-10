import React from 'react'

export const SentMessage = () => {
    return (
        <div>
            <form className="flex items-center space-x-6">
                <div className="shrink-0">
                    <img className="h-16 w-16 object-cover rounded-full" src="https://randomuser.me/api/portraits/men/34.jpg" alt="Current profile photo" />
                </div>
                <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input type="email" name="email" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" />
                </label>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>

                </button>
            </form>

        </div>
    )
}
