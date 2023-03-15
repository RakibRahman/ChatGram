export const ProgressBar = ({ value }: { value: number }) => {
    return (
        <>
            <div
                style={{
                    border: '1px solid #e0e0e0',
                    width: '100%',
                    borderRadius: '4px',
                    boxShadow: '0 0 3px #B0B0',
                    backdropFilter: 'blur(2px) brightness(101%)',
                }}
            >
                <div
                    style={{
                        width: `${value}%`,
                    }}
                    className={`bg-sky-300 rounded-sm text-white text-center h-6 shadow-md shadow-blue-500/50`}
                >
                    {value ?? 0}%
                </div>
            </div>
        </>
    );
};
