import { useState } from 'react';

type Props = {
    type?: string;
    heading: string;
    children: React.ReactNode;
    closable?: boolean;
    onClose?: () => void;
    };


export function Alert ({
    type ='information',
    heading,
    children,
    onClose}:Props) {
        const [visible, setVisible] = useState<boolean>(false);
        if (!visible) {
            return <div>Gone!</div>;
        }else{
            return <span></span>
        }
    }