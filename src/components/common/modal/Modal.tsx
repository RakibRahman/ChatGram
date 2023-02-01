import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

interface ModalProps {
    children?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title?: string;
    noText?: string;
    yesText?: string;
}

export const Modal: FC<ModalProps> = ({
    yesText,
    noText,
    children,
    isOpen,
    onClose,
    onConfirm,
    title,
}) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed z-50  inset-0" style={{
            backgroundColor: 'rgba(0,0,0,0.8)'
        }}>
            <div className="fixed bg-white rounded-lg flex flex-col   -translate-y-2/4 -translate-x-2/4 left-2/4 top-2/4 z-50 py-2 px-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold tracking-widest mb-2">
                        {title ?? 'Are You Sure You Want to Continue?'}
                    </h3>
                    <button className="titleCloseBtn" onClick={onClose}>
                        X
                    </button>
                </div>

                <div className="w-80 min-w-full my-2">{children}</div>

                <div className="flex justify-end gap-4 mt-2">
                    <button onClick={onClose} className="text-center bg-red-600 text-white rounded text-sm cursor-pointer border-none px-4 py-2">
                        {noText ?? 'Cancel'}
                    </button>
                    <button className='text-center bg-blue-500 text-white rounded text-sm cursor-pointer border-none px-4 py-2' onClick={onConfirm}>{yesText ?? 'Continue'}</button>
                </div>
            </div >
        </div >,
        document.getElementById('modalPortal') as HTMLElement
    );
};
