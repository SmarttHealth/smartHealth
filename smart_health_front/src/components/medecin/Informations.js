import React from 'react';
import Info from './info';
import InfoConsultation from './infoConsultation';
import BasicDateCalendar from './calender';

export default function Informations(){
    return (
        <div className="flex flex-row">
        <div className="w-1/3 mr-4">
            <Info/>
        </div>
        <div className="w-1/3 ml-4">
            <InfoConsultation/>
        </div>
        <div className="w-1/3 ml-4">
            <BasicDateCalendar/>
        </div>
    </div>
    );
}