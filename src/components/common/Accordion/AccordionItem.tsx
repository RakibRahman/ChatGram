import React from 'react';
interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
}
export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
    return (
        <details className="p-4 rounded-lg">
            <summary className="font-semibold cursor-pointer">{title}</summary>
            <div className="mt-3">
                <p className="text-sm leading-6">{children}</p>
            </div>
        </details>
    );
};
