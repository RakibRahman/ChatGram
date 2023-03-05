import React, { Dispatch, SetStateAction, useState } from 'react';
import useCopyToClipboard from '../../hooks/useCopyToClipBoard';
import { GroupMessage } from '../../models/types';
import { ContextMenuItem } from '../common/ContextMenu/ContextMenuItem';
import { ContextMenuList } from '../common/ContextMenu/ContextMenuList';
import { DeleteMessage } from '../DeleteMessage/DeleteMessage';
import { ForwardMessage } from '../ForwardMessage/ForwardMessage';

interface RenderMessageContextProps {
    selectedMessage: GroupMessage;
    points: {
        x: number;
        y: number;
    };
    setForwardOpen: Dispatch<SetStateAction<boolean>>;
    setDeleteOpen: Dispatch<SetStateAction<boolean>>;
}

export const RenderMessageContext: React.FC<RenderMessageContextProps> = ({
    selectedMessage,
    points,
    setDeleteOpen,
    setForwardOpen,
}) => {
    const [value, copy] = useCopyToClipboard();
    const isFile = selectedMessage.type !== 'text' && selectedMessage?.fileLink;
    const isLink = selectedMessage.type === 'link';
    const isText =
        selectedMessage.message &&
        (selectedMessage.type === 'text' || selectedMessage.type === 'text-link');

    return (
        <div>
            <div
                style={{
                    position: 'absolute',
                    top: `${points.y}px`,
                    left: `${points.x}px`,
                    zIndex: 10,
                }}
            >
                <ContextMenuList>
                    {isText ? (
                        <ContextMenuItem
                            icon="copy-text"
                            title="Copy Text"
                            action={() => {
                                if (selectedMessage) {
                                    copy(selectedMessage?.message);
                                }
                            }}
                        />
                    ) : null}

                    {isFile ? (
                        <ContextMenuItem
                            icon="copy-link"
                            title={`Copy ${selectedMessage.type ?? File} Link`}
                            action={() => {
                                if (selectedMessage) {
                                    copy(selectedMessage?.fileLink!);
                                }
                            }}
                        />
                    ) : null}

                    {isLink ? (
                        <ContextMenuItem
                            icon="url-link"
                            title={`Copy  Link`}
                            action={() => {
                                if (selectedMessage) {
                                    copy(selectedMessage?.message!);
                                }
                            }}
                        />
                    ) : null}

                    {isFile ? (
                        <ContextMenuItem
                            icon="download"
                            downloadUrl={selectedMessage?.fileLink!}
                            title="Download File"
                            action={() => {}}
                        />
                    ) : null}

                    <ContextMenuItem
                        icon="forward"
                        title="Forward Message"
                        action={() => {
                            if (selectedMessage) {
                                // copy(selectedMessage?.message);
                                setForwardOpen(true);
                            }
                        }}
                    />

                    <ContextMenuItem
                        icon="delete"
                        title="Delete Message"
                        action={() => {
                            if (selectedMessage) {
                                // copy(selectedMessage?.message);
                                setDeleteOpen(true);
                            }
                        }}
                    />
                </ContextMenuList>
            </div>
        </div>
    );
};
