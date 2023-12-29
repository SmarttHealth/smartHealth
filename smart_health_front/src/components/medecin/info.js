import React from 'react';
import InfoPatient from './infoPatient';

export default function Info({counter}){
    return (
        <div className="h-full relative top-0 ">
        <InfoPatient counter={counter}/>
        </div>

    );
}