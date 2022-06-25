import { Alert, Collapse } from '@mui/material';
import { useState } from 'react';

interface Props {
    message?: any
}

export default function ErrorInput({ message }: Props) {

    const [show, setShow] = useState(true);

    return (
        <Collapse in={show == true && message !== undefined}>
            <small className='text-red-400'>{message}</small>
        </Collapse>
    )
}