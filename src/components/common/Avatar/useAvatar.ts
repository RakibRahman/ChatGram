const gradients = [
    'from-slate-900 to-slate-700',
    'from-blue-600 to-violet-600',
    'from-pink-500 to-rose-500',
    'from-violet-600 to-indigo-600',
    'from-violet-500 to-purple-500',
    'from-indigo-500 to-blue-500',
    'from-cyan-500 to-blue-500',
    'from-lime-400 to-lime-500',
    'from-red-500 to-orange-500',
    'from-amber-200 to-yellow-500',
    'from-emerald-500 to-emerald-900',
];

export const useAvatar = (name: string) => {
    const getRandomIndex = Math.floor(Math.random() * gradients.length);

    const getAvatarName = (): string => {
        const nameArray = name.trim().split(' ');
        let shortName = '';

        for (let i = 0; i < 3; i++) {
            if (i === 1 && nameArray.length > 2) continue;
            shortName += nameArray[i] ? nameArray[i][0] : '';
        }
        return shortName.toUpperCase();
    };

    return { avatarName: getAvatarName(), gradient: gradients[getRandomIndex] };
};
