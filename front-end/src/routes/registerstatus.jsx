import * as React from 'react';
import { useGlobalState } from '../functions/globalState';
import './App.css';
import { Fragment } from 'react';

export default function RegisterStatus() {

    const { statusMessage, setStatusMessage } = useGlobalState();
    const realMessage = statusMessage;
    return (
        <>
            <div className="loginBack">
                <p>{realMessage}</p>
            </div>
        </>)

};