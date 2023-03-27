import React from 'react';
import ReactDOM from 'react-dom';
import { X } from 'react-feather';

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
    size?: string;
    disableYesBtn?: boolean;
}

export const ModalV2: React.FC<Partial<ModalProps>> = ({
    yesText,
    noText,
    children,
    isOpen,
    onClose,
    onConfirm,
    title,
    hideTitleClose = false,
    hideYesBtn = false,
    size = 'sm',
    disableYesBtn = false,
}) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div
                        className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-${size}`}
                    >
                        <div className="bg-base-300 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="">
                                {/* sm:flex sm:items-start */}
                                <div className="mt-3 sm:mt-0">
                                    <div className="flex justify-between cursor-pointer">
                                        {' '}
                                        <h1
                                            className=" font-semibold leading-6 text-base-content text-xl"
                                            id="modal-title"
                                        >
                                            {title ?? 'Are you sure?'}
                                        </h1>
                                        <X onClick={onClose} />
                                    </div>
                                    <div className="mt-2">{children}</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            {hideYesBtn ? null : (
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
                                    disabled={disableYesBtn}
                                    onClick={onConfirm}
                                >
                                    {' '}
                                    {yesText ?? 'Continue'}
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                {' '}
                                {noText ?? 'Cancel'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modalPortal') as HTMLElement
    );
};
