import * as React from 'react';
import { useGlobalState } from '../functions/globalState';

export default function RegisterStatus() {

    const { statusMessage, setStatusMessage } = useGlobalState();
    const realMessage = statusMessage;
    return(<p>{realMessage}</p>)

}