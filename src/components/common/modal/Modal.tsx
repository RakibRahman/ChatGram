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
    hideTitleClose?: boolean;
    hideYesBtn?: boolean;
}

export const Modal: FC<ModalProps> = ({
    yesText,
    noText,
    children,
    isOpen,
    onClose,
    onConfirm,
    title,
    hideTitleClose = false,
    hideYesBtn = false,
}) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed z-50  inset-0"
            style={{
                backgroundColor: 'rgba(0,0,0,0.8)',
            }}
        >
            <div className="fixed bg-base-200 rounded-lg flex flex-col   -translate-y-2/4 -translate-x-2/4 left-2/4 top-2/4 z-50 py-2 px-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold tracking-widest mb-2">
                        {title ?? 'Are You Sure You Want to Continue?'}
                    </h3>
                    {hideTitleClose ? null : (
                        <button className="btn btn-sm btn-circle" onClick={onClose}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="w-80 min-w-full my-2">{children}</div>

                <div className="flex justify-end gap-4 mt-2">
                    <button
                        onClick={onClose}
                        className="text-center btn btn-outline btn-error rounded text-sm cursor-pointer btn-sm hover:text-white"
                    >
                        {noText ?? 'Cancel'}
                    </button>
                    {hideYesBtn ? null : (
                        <button
                            className="text-center btn btn-outline btn-success text-sm cursor-pointer btn-sm"
                            onClick={onConfirm}
                        >
                            {yesText ?? 'Continue'}
                        </button>
                    )}
                </div>
            </div>
        </div>,
        document.getElementById('modalPortal') as HTMLElement
    );
};
