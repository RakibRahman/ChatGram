import React from 'react';
import { AlertTriangle, CheckCircle, Info, XOctagon } from 'react-feather';

interface AlertProps {
    type?: 'warning' | 'error' | 'info' | 'success';
    size?: string | number;
    title: string;
    description?: string;
}

export const Alert: React.FC<AlertProps> = ({ type = 'error', size = 42, title, description }) => {
    const icons = {
        warning: <AlertTriangle size="20px" />,
        error: <XOctagon size="20px" />,
        info: <Info size="20px" />,
        success: <CheckCircle size="20px" />,
    };

    return (
        <div className={`alert alert-${type} shadow-lg`}>
            <div className={`h-${size}`}>
                {icons[type]}
                <div>
                    <h3 className="font-bold">{title}</h3>
                    {description ? <div className="text-sm">{description}</div> : null}
                </div>
            </div>
        </div>
    );
};
